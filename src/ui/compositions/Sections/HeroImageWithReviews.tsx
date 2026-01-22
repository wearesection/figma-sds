import { useMediaQuery } from "hooks";
import { Flex, Section, type SectionProps } from "layout";
import { Button, TextContentTitle } from "primitives";
import { ReviewCard } from "../Cards/Cards";

export type HeroImageWithReviewsProps = Omit<
  SectionProps,
  "variant" | "src"
> & {
  /**
   * Background image URL (required)
   */
  backgroundImage: string;

  /**
   * Main heading text
   */
  title: string;

  /**
   * Optional subheading text
   */
  subtitle?: string;

  /**
   * CTA button text (if not provided, button is hidden)
   */
  buttonText?: string;

  /**
   * Button link href
   */
  buttonHref?: string;

  /**
   * Button click handler
   */
  onButtonPress?: () => void;

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
 * Hero section with background image, title/subtitle, CTA button, and review cards.
 * Fully responsive with desktop (horizontal) and mobile (vertical) layouts.
 */
export function HeroImageWithReviews({
  backgroundImage,
  title,
  subtitle,
  buttonText,
  buttonHref,
  onButtonPress,
  reviews,
  ...sectionProps
}: HeroImageWithReviewsProps) {
  const { isTabletDown } = useMediaQuery();

  return (
    <Section
      variant="image"
      src={backgroundImage}
      padding="1600"
      {...sectionProps}
    >
      <Flex
        direction={isTabletDown ? "column" : "row"}
        gap={isTabletDown ? "800" : "1600"}
        alignPrimary={isTabletDown ? "center" : "space-between"}
        alignSecondary="center"
      >
        {/* Left column: Title and Button */}
        <Flex
          direction="column"
          gap="400"
          alignSecondary={isTabletDown ? "center" : "start"}
        >
          <TextContentTitle
            title={title}
            subtitle={subtitle}
            align={isTabletDown ? "center" : "start"}
          />
          {buttonText && (
            <Button
              variant="primary"
              size="medium"
              href={buttonHref}
              onPress={onButtonPress}
            >
              {buttonText}
            </Button>
          )}
        </Flex>

        {/* Right column: Review Cards Grid */}
        <Flex
          container
          wrap
          gap="600"
          type={isTabletDown ? undefined : "third"}
          alignPrimary={isTabletDown ? "center" : "start"}
        >
          {reviews.map((review, index) => (
            <ReviewCard
              key={index}
              stars={review.stars}
              title={review.title}
              body={review.body}
              name={review.name}
              date={review.date}
              src={review.src}
            />
          ))}
        </Flex>
      </Flex>
    </Section>
  );
}
