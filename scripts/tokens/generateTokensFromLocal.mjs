
import fs from "fs";
import path from "path";

const INPUT_DIR = "../../figma tokens";
const OUTPUT_FILE = "./tokens.json";
const NAMESPACE = "com.figma.sds";

// Mapping from folder names to collection keys in tokens.json
// Keys must match what app.mjs expects (based on COLLECTION_DATA keys)
const COLLECTION_MAPPING = {
  "Color": "@color",
  "Color Primitives": "@color_primitives",
  "Size": "@size",
  "Typography": "@typography",
  "Typography Primitives": "@typography_primitives",
  "Responsive": "@responsive", // Assuming this might be used
};

// Mode mapping for known collections
const MODE_MAPPING = {
  "@color": {
    "SDS Light.json": "sds_light",
    "SDS Dark.json": "sds_dark",
  },
  "@typography": {
    "Mode 1.json": "default"
  }
};

const ALIAS_PREFIX_MAPPING = {
  "@color_primitives": "sds-color",
  "@color": "sds-color",
  "@size": "sds-size",
  "@typography": "sds-typography",
  "@typography_primitives": "sds-typography",
  "@responsive": "sds-responsive"
};

const KEY_PREFIX_COLLECTION = "@";

// --- New: Load existing IDs ---
const idMap = {};
try {
  // Use git show to get the original file content before we modified it, or just use tokens.json if it exists and hasn't been completely wiped.
  // Actually, since we've already overwritten it, let's try to get it from git.
  const { execSync } = await import('child_process');
  const originalTokensJSON = execSync('git show HEAD:scripts/tokens/tokens.json', { encoding: 'utf8' });
  const original = JSON.parse(originalTokensJSON);

  function buildIdMap(obj, path = "") {
    if (obj.$extensions && obj.$extensions[NAMESPACE] && obj.$extensions[NAMESPACE].figmaId) {
      idMap[path] = obj.$extensions[NAMESPACE].figmaId;
    }
    for (const key in obj) {
      if (key.startsWith('$')) continue;
      buildIdMap(obj[key], path ? `${path}.${key}` : key);
    }
  }

  for (const collection in original) {
    // collection is like "@color_primitives"
    buildIdMap(original[collection], collection);
  }
} catch (e) {
  console.warn("Could not load original figmaIds from tokens.json. Styles may not resolve correctly.", e);
}
// -----------------------------

function sanitizeName(name) {
  return name
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/^ +/, "")
    .replace(/ +$/, "")
    .replace(/ +/g, "_")
    .toLowerCase();
}

function sanitizeKey(name) {
  return name
    .split(/[^\da-zA-Z]+/)
    .join("-")
    .toLowerCase();
}

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
}

function getAllFiles(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

async function generate() {
  const rootDir = path.resolve(INPUT_DIR);
  // Handle space in path if needed, but path.resolve should handle it.

  const result = {};

  // 1. Read all files and organize by collection
  const collectionFiles = {};

  if (!fs.existsSync(rootDir)) {
    console.error(`Directory not found: ${rootDir}`);
    process.exit(1);
  }

  const items = fs.readdirSync(rootDir);
  for (const item of items) {
    const fullPath = path.join(rootDir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      const mapping = COLLECTION_MAPPING[item];
      if (mapping) {
        collectionFiles[mapping] = collectionFiles[mapping] || [];
        const files = fs.readdirSync(fullPath);
        for (const f of files) {
          if (f.endsWith(".json")) {
            collectionFiles[mapping].push({
              path: path.join(fullPath, f),
              filename: f
            });
          }
        }
      }
    }
  }

  // Map to store where top-level keys belong (Variable -> Collection)
  const variableToCollection = {};

  // 2. Process each collection
  for (const [collectionKey, files] of Object.entries(collectionFiles)) {
    result[collectionKey] = {}; // Initialize collection object

    // We need to merge modes
    // If multiple files map to different modes, we merge them into unified structure with $extensions

    for (const file of files) {
      const content = JSON.parse(fs.readFileSync(file.path, 'utf8'));

      let mode = "default";
      if (MODE_MAPPING[collectionKey] && MODE_MAPPING[collectionKey][file.filename]) {
        mode = MODE_MAPPING[collectionKey][file.filename];
      } else if (file.filename === "Default.json") {
        mode = "default";
      }

      // Register top level keys for alias resolution
      // Note: content keys are "Slate", "Background", etc.
      // We need to register "Slate" -> "@color_primitives"
      Object.keys(content).forEach(k => {
        variableToCollection[k] = collectionKey;
      });

      // Traverse and merge into result[collectionKey]
      traverseAndMerge(result[collectionKey], content, mode, collectionKey, collectionKey);
    }
  }

  // 3. Fix Aliases
  fixAliases(result, variableToCollection);

  // 4. Sanitize keys
  // ...

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));
  console.log("tokens.json generated from local files.");
}

function traverseAndMerge(targetNode, sourceNode, mode, collectionKey, currentPath) {
  // sourceNode is a tree of variables. targetNode is the destination in the unified structure.

  for (const key in sourceNode) {
    if (key.startsWith("$")) continue; // Skip metadata at this level if mixed

    const safeKey = sanitizeKey(key);
    const fullPath = `${currentPath}.${safeKey}`;

    if (!targetNode[safeKey]) {
      targetNode[safeKey] = {};
    }

    const srcVal = sourceNode[key];

    if (srcVal.$value !== undefined) {
      // It is a token
      const token = targetNode[safeKey];
      token.$type = srcVal.$type;
      token.$description = srcVal.$description; // merge description?

      // Construct extension structure if not exists
      if (!token.$extensions) {
        token.$extensions = {
          [NAMESPACE]: {
            modes: {}
          }
        };
      }

      // Restore figmaId if we have it
      if (idMap[fullPath]) {
        token.$extensions[NAMESPACE].figmaId = idMap[fullPath];
      }

      // Check for alias in value
      let value = srcVal.$value;

      token.$extensions[NAMESPACE].modes[mode] = value;

      // Also set default $value if mode is default or first one (shim)
      if (mode === 'default' || !token.$value || mode === 'sds_light') {
        token.$value = value;
      }

    } else {
      // It is a group
      traverseAndMerge(targetNode[safeKey], srcVal, mode, collectionKey, fullPath);
    }
  }
}

function fixAliases(result, variableToCollection) {
  // Recursive function to find string values with {Alias} and rewrite them
  function recurse(node) {
    if (typeof node === 'string') {
      return node.replace(/{([^}]+)}/g, (match, alias) => {
        // alias might be "White.1000" or "Slate.100"
        const parts = alias.split('.');
        const topKey = parts[0];

        // Find which collection this topKey belongs to
        // BUT topKey in variableToCollection is "Slate" (Original Name)
        // parts[0] is "Slate". this matches.

        const collection = variableToCollection[topKey];
        if (collection) {
          // Use the mapped prefix to ensure correct CSS variable generation (e.g. sds-color-...)
          const prefix = ALIAS_PREFIX_MAPPING[collection] || collection.replace('@', '');
          return `{${prefix}.${alias}}`;
        }
        return match;
      });
    } else if (typeof node === 'object' && node !== null) {
      for (const key in node) {
        node[key] = recurse(node[key]);
      }
    }
    return node;
  }

  recurse(result);
}

generate();
