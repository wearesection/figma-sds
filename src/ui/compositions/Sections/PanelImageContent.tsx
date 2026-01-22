import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";
import { useMediaQuery } from "hooks";
import { IconChevronLeft, IconChevronRight } from "icons";
import { Flex, Section } from "layout";
import {
  Tag,
  TextPrice,
  TextContentHeading,
  TextList,
  TextListItem,
  IconButton,
  Text,
  TextHeading,
} from "primitives";
import { Card } from "../Cards/Cards";
import "./PanelImageContent.css";

export type PanelImageContentProps = ComponentPropsWithoutRef<"div"> & {
  // Image area
  imageSrc?: string;
  imageAlt?: string;
  tagText?: string;
  tagScheme?: "brand" | "danger" | "positive" | "warning" | "neutral";
  tagVariant?: "primary" | "secondary";
  priceAmount: string;
  priceCurrency: string;
  priceLabel?: string;

  // Content area
  heading: string;
  subheading?: string;
  listItems?: string[];

  // Card carousel
  cards?: Array<{
    heading: string;
    body: string;
    imageSrc?: string;
  }>;
  currentCardIndex?: number;
  onPreviousPress?: () => void;
  onNextPress?: () => void;

  // Section styling
  backgroundColor?: "brand" | "neutral" | "subtle" | "stroke";
  padding?: "600" | "800" | "1200" | "1600";
};

/**
 * Panel section with image on left (desktop) or top (mobile) and content on right (desktop) or bottom (mobile).
 * Displays product/pricing information with optional tag, list items, and card carousel.
 */
export function PanelImageContent({
  imageSrc,
  imageAlt = "",
  tagText,
  tagScheme = "brand",
  tagVariant = "primary",
  priceAmount,
  priceCurrency,
  priceLabel,
  heading,
  subheading,
  listItems,
  cards,
  currentCardIndex = 0,
  onPreviousPress,
  onNextPress,
  backgroundColor,
  padding,
  className,
  ...props
}: PanelImageContentProps) {
  const { isTabletDown } = useMediaQuery();

  const currentCard = cards?.[currentCardIndex];

  return (
    <Section
      variant={backgroundColor}
      padding={padding || (isTabletDown ? "600" : "1600")}
      className={clsx(className, "panel-image-content")}
      {...props}
    >
      <Flex
        direction={isTabletDown ? "column" : "row"}
        gap={isTabletDown ? "600" : "1200"}
        alignSecondary={isTabletDown ? "center" : "start"}
      >
        {/* Image Panel */}
        <div className="panel-image-content-image-wrapper">
          {imageSrc && <img src={imageSrc} alt={imageAlt} />}

          {/* Overlay: Tag at top, Price at bottom */}
          <Flex
            direction="column"
            alignPrimary="space-between"
            className="panel-image-content-overlay"
          >
            {tagText && (
              <Tag scheme={tagScheme} variant={tagVariant}>
                {tagText}
              </Tag>
            )}
            <TextPrice
              currency={priceCurrency}
              price={priceAmount}
              label={priceLabel}
              size="large"
            />
          </Flex>
        </div>

        {/* Content Panel */}
        <Flex
          direction="column"
          gap="600"
          alignSecondary={isTabletDown ? "center" : "start"}
        >
          <TextContentHeading
            heading={heading}
            subheading={subheading}
            align={isTabletDown ? "center" : "start"}
          />

          {listItems && listItems.length > 0 && (
            <TextList>
              {listItems.map((item, i) => (
                <TextListItem key={i}>{item}</TextListItem>
              ))}
            </TextList>
          )}

          {currentCard && (
            <Card
              direction="horizontal"
              variant="stroke"
              padding="600"
              asset={
                currentCard.imageSrc ? (
                  <img
                    src={currentCard.imageSrc}
                    alt={currentCard.heading}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : undefined
              }
            >
              <Flex direction="column" gap="200">
                <TextHeading>{currentCard.heading}</TextHeading>
                <Text>{currentCard.body}</Text>
              </Flex>
            </Card>
          )}

          {cards && cards.length > 1 && (onPreviousPress || onNextPress) && (
            <Flex gap="300" alignPrimary="end">
              {onPreviousPress && (
                <IconButton
                  aria-label="Previous card"
                  variant="neutral"
                  onPress={onPreviousPress}
                >
                  <IconChevronLeft />
                </IconButton>
              )}
              {onNextPress && (
                <IconButton
                  aria-label="Next card"
                  variant="neutral"
                  onPress={onNextPress}
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
