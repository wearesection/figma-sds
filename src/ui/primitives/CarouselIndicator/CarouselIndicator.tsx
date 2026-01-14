import clsx from "clsx";
import "./carousel-indicator.css";

export interface CarouselIndicatorProps {
  count: number;
  current: number;
  onChange: (index: number) => void;
  className?: string;
  variant?: "dots";
}

export function CarouselIndicator({
  count,
  current,
  onChange,
  className,
  variant = "dots",
}: CarouselIndicatorProps) {
  const classNames = clsx("carousel-indicator", className, `carousel-indicator-${variant}`);

  return (
    <div className={classNames} role="tablist">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          role="tab"
          aria-selected={index === current}
          aria-current={index === current}
          aria-label={`Go to slide ${index + 1}`}
          className="carousel-indicator-dot"
          onClick={() => onChange(index)}
        />
      ))}
    </div>
  );
}
