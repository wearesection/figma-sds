import { Button } from "primitives";
import { TextContentTitle } from "primitives";
import { Flex } from "layout";
import { Section } from "layout";
import { ReviewCard } from "compositions";
import { useMediaQuery } from "hooks";

export type ReviewsHeroProps = {
  /**
   * The main title
   */
  title: string;
  /**
   * The subtitle (optional)
   */
  subtitle?: string;
  /**
   * The CTA button text (optional)
   */
  ctaText?: string;
  /**
   * Callback when CTA button is clicked
   */
  onCtaClick?: () => void;
  /**
   * Background image source (optional)
   */
  backgroundImageSrc?: string;
  /**
   * Array of review data
   */
  reviews: Array<{
    stars: number;
    title: string;
    body: string;
    name: string;
    date: string;
    src?: string;
  }>;
};

/**
 * A hero section component that displays a title, subtitle, CTA button, and review cards.
 * Responsive layout: horizontal on desktop, vertical stacked on mobile.
 */
export function ReviewsHero({
  title,
  subtitle,
  ctaText,
  onCtaClick,
  backgroundImageSrc,
  reviews,
}: ReviewsHeroProps) {
  const { isMobile } = useMediaQuery();

  return (
    <Section
      padding="4000"
      variant={backgroundImageSrc ? "image" : undefined}
      src={backgroundImageSrc}
    >
      <Flex
        container
        direction={isMobile ? "column" : "row"}
        gap={isMobile ? "800" : "1200"}
        alignPrimary={isMobile ? "center" : "start"}
        alignSecondary="center"
      >
        {/* Title + CTA section */}
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
          {ctaText && <Button onPress={onCtaClick}>{ctaText}</Button>}
        </Flex>

        {/* Review cards section */}
        <Flex
          wrap
          gap="600"
          alignPrimary="center"
          direction="row"
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
