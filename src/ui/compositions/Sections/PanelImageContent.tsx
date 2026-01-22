import { ReactNode } from "react";
import { useMediaQuery } from "hooks";
import { Flex, Section } from "layout";
import {
  IconButton,
  Tag,
  Text,
  TextContentHeading,
  TextHeading,
  TextList,
  TextListItem,
  TextPrice,
} from "primitives";
import { Card } from "../Cards/Cards";
import { IconChevronLeft, IconChevronRight } from "icons";

export type PanelImageContentProps = {
  // Image section
  imageSrc: string;
  imageAlt?: string;
  tagText?: string;
  tagScheme?: "brand" | "danger" | "positive" | "warning" | "neutral";
  tagVariant?: "primary" | "secondary";
  priceAmount: string;
  priceCurrency: string;
  priceLabel?: string;

  // Content section
  heading: string;
  subheading?: string;
  listItems?: string[];

  // Card content (flexible via children slots)
  cardHeading?: string;
  cardBody?: string;
  cardAsset?: ReactNode;

  // Navigation
  onPreviousPress?: () => void;
  onNextPress?: () => void;

  // Section wrapper props
  padding?: "600" | "800" | "1200" | "1600";
  variant?: "brand" | "neutral" | "stroke" | "subtle";
};

export function PanelImageContent({
  imageSrc,
  imageAlt,
  tagText,
  tagScheme = "positive",
  tagVariant = "secondary",
  priceAmount,
  priceCurrency,
  priceLabel = "/ mo",
  heading,
  subheading,
  listItems,
  cardHeading,
  cardBody,
  cardAsset,
  onPreviousPress,
  onNextPress,
  padding = "1600",
  variant = "neutral",
}: PanelImageContentProps) {
  const { isTabletDown } = useMediaQuery();

  return (
    <Section variant={variant} padding={isTabletDown ? "600" : padding}>
      <Flex
        direction={isTabletDown ? "column" : "row"}
        gap={isTabletDown ? "600" : "1200"}
        alignPrimary={isTabletDown ? "center" : "start"}
        alignSecondary={isTabletDown ? "center" : "start"}
      >
        {/* Image Section */}
        <div
          style={{
            position: "relative",
            width: isTabletDown ? "100%" : "484px",
            maxWidth: isTabletDown ? "420px" : "484px",
            aspectRatio: "1",
            backgroundColor: "var(--sds-color-slate-200)",
            borderRadius: "var(--sds-size-radius-200)",
            overflow: "hidden",
          }}
        >
          {/* Background image with reduced opacity */}
          {imageSrc && (
            <img
              src={imageSrc}
              alt={imageAlt || ""}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                opacity: 1,
              }}
            />
          )}

          {/* Overlay elements using Flex for positioning */}
          <Flex
            direction="column"
            alignPrimary="space-between"
            style={{
              position: "absolute",
              inset: 0,
              padding: "var(--sds-size-space-400)",
            }}
          >
            <Flex alignSecondary="start">
              {tagText && (
                <Tag scheme={tagScheme} variant={tagVariant}>
                  {tagText}
                </Tag>
              )}
            </Flex>
            <Flex alignSecondary="start">
              <TextPrice
                currency={priceCurrency}
                price={priceAmount}
                label={priceLabel}
                size="large"
              />
            </Flex>
          </Flex>
        </div>

        {/* Content Section */}
        <Flex
          direction="column"
          gap="600"
          alignSecondary={isTabletDown ? "center" : "start"}
          style={
            isTabletDown ? { maxWidth: "420px", width: "100%" } : undefined
          }
        >
          {/* 1. Heading and Subheading */}
          <TextContentHeading
            heading={heading}
            subheading={subheading}
            align={isTabletDown ? "center" : "start"}
          />

          {/* 2. List Items */}
          {listItems && listItems.length > 0 && (
            <TextList density="default">
              {listItems.map((item, index) => (
                <TextListItem key={index}>{item}</TextListItem>
              ))}
            </TextList>
          )}

          {/* 3. Card Component */}
          {(cardHeading || cardBody) && (
            <Card direction="horizontal" variant="stroke" asset={cardAsset}>
              {cardHeading && <TextHeading>{cardHeading}</TextHeading>}
              {cardBody && <Text>{cardBody}</Text>}
            </Card>
          )}

          {/* 4. Navigation Buttons */}
          {(onPreviousPress || onNextPress) && (
            <Flex
              direction="row"
              gap="300"
              alignPrimary="end"
              style={{ width: "100%" }}
            >
              {onPreviousPress && (
                <IconButton
                  aria-label="Previous"
                  onPress={onPreviousPress}
                  variant="neutral"
                >
                  <IconChevronLeft />
                </IconButton>
              )}
              {onNextPress && (
                <IconButton
                  aria-label="Next"
                  onPress={onNextPress}
                  variant="neutral"
                >
                  <IconChevronRight />
                </IconButton>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Section>
  );
}
