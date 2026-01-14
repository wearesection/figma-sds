import clsx from "clsx";
import { IconArrowLeft, IconArrowRight } from "icons";
import { Flex } from "layout";
import {
  Button,
  CarouselIndicator,
  Image,
  TextContentHeading,
} from "primitives";
import { useState } from "react";
import "./infinite-carousel.css";

export interface CarouselItem {
  image: string;
  title: string;
  description: string;
  alt: string;
}

export interface InfiniteCarouselProps {
  items: CarouselItem[];
  className?: string;
  "aria-label"?: string;
}

export function InfiniteCarousel({
  items,
  className,
  "aria-label": ariaLabel = "Carousel",
}: InfiniteCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const currentItem = items[currentIndex];

  if (!items.length) return null;

  return (
    <div
      className={clsx("infinite-carousel", className)}
      aria-label={ariaLabel}
      role="region"
    >
      <div className="infinite-carousel-container">
        <Image
          src={currentItem.image}
          alt={currentItem.alt}
          aspectRatio="4-3"
          size="fill"
          variant="rounded"
        />

        <div className="infinite-carousel-controls infinite-carousel-prev">
          <Button
            variant="neutral"
            onClick={handlePrev}
            aria-label="Previous slide"
            className="infinite-carousel-button"
          >
            <IconArrowLeft />
          </Button>
        </div>

        <div className="infinite-carousel-controls infinite-carousel-next">
          <Button
            variant="neutral"
            onClick={handleNext}
            aria-label="Next slide"
            className="infinite-carousel-button"
          >
            <IconArrowRight />
          </Button>
        </div>
      </div>

      <Flex direction="column" gap="200" alignSecondary="center">
        <CarouselIndicator
          count={items.length}
          current={currentIndex}
          onChange={handleDotClick}
        />
        <div className="infinite-carousel-content">
          <TextContentHeading
            align="center"
            heading={currentItem.title}
            subheading={currentItem.description}
          />
        </div>
      </Flex>
    </div>
  );
}
