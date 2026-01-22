import { Button } from "primitives";
import { TextContentTitle } from "primitives";
import { Flex } from "layout";
import { Section } from "layout";
import { ReviewCard } from "compositions";
import { useMediaQuery } from "hooks";
import type { ReviewCardProps } from "compositions";

export type HeroImageWithReviewsProps = {
  /**
   * The main title text
   */
  title: string;
  /**
   * The subtitle text (optional)
   */
  subtitle?: string;
  /**
   * The CTA button text (optional)
   */
  buttonText?: string;
  /**
   * Callback when button is clicked
   */
  onButtonClick?: () => void;
  /**
   * Background image source
   */
  backgroundImageSrc: string;
  /**
   * Array of review data to display
   */
  reviews: ReviewCardProps[];
  /**
   * Section padding (defaults to 4000)
   */
  padding?: "600" | "800" | "1200" | "1600" | "4000";
  /**
   * Gap between sections (defaults to 1200)
   */
  gap?: "100" | "200" | "300" | "400" | "600" | "800" | "1200" | "1600";
};

/**
 * A responsive hero section component with background image, title/subtitle/button, and review cards grid.
 * Desktop layout: title/button on left, review cards in wrap grid on right.
 * Mobile layout: title/button centered at top, review cards stacked below.
 */
export function HeroImageWithReviews({
  title,
  subtitle,
  buttonText,
  onButtonClick,
  backgroundImageSrc,
  reviews,
  padding = "4000",
  gap = "1200",
}: HeroImageWithReviewsProps) {
  const { isMobile } = useMediaQuery();

  return (
    <Section padding={padding} variant="image" src={backgroundImageSrc}>
      <Flex
        container
        direction={isMobile ? "column" : "row"}
        gap={gap}
        alignPrimary={isMobile ? "center" : "start"}
        alignSecondary={isMobile ? "center" : "start"}
      >
        {/* Title + Button section */}
        <Flex
          direction="column"
          gap="400"
          alignSecondary={isMobile ? "center" : "start"}
        >
          <TextContentTitle
            title={title}
            subtitle={subtitle}
            align={isMobile ? "center" : "start"}
          />
          {buttonText && (
            <Button variant="primary" onPress={onButtonClick}>
              {buttonText}
            </Button>
          )}
        </Flex>

        {/* Review cards grid */}
        <Flex
          wrap
          gap="600"
          direction="row"
          type="third"
          alignPrimary={isMobile ? "center" : "start"}
          style={{ flex: isMobile ? undefined : "1 0 0" }}
        >
          {reviews.map((review, idx) => (
            <ReviewCard key={idx} {...review} />
          ))}
        </Flex>
      </Flex>
    </Section>
  );
}
