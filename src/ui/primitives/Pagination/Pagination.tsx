import clsx from "clsx";
import { useMediaQuery } from "hooks";
import { IconArrowLeft, IconArrowRight } from "icons";
import { Button } from "primitives";
import type React from "react";
import "./pagination.css";

export type PaginationProps = React.ComponentPropsWithoutRef<"nav">;
export function Pagination({
  "aria-label": ariaLabel = "Page navigation",
  className,
  ...props
}: PaginationProps) {
  const classNames = clsx("pagination", className);
  return <nav aria-label={ariaLabel} {...props} className={classNames} />;
}

export interface PaginationPreviousProps extends Omit<React.ComponentProps<typeof Button>, "href"> {
  href?: string | null;
  children?: React.ReactNode;
}

export function PaginationPrevious({
  href = null,
  children = "Previous",
  ...props
}: PaginationPreviousProps) {
  return (
    <Button
       {...(href === null ? { disabled: true } : { href })}
       variant="subtle"
       aria-label="Previous page"
       {...props}
     >
       <IconArrowLeft />
       {children}
     </Button>
  );
}

export interface PaginationNextProps extends Omit<React.ComponentProps<typeof Button>, "href"> {
  href?: string | null;
  children?: React.ReactNode;
}

export function PaginationNext({
  href = null,
  children = "Next",
  ...props
}: PaginationNextProps) {
  return (
    <Button
      {...(href === null ? { disabled: true } : { href })}
      variant="subtle"
      aria-label="Next page"
      {...props}
    >
      {children}
      <IconArrowRight />
    </Button>
  );
}

export function PaginationList({ children }: { children: React.ReactNode }) {
  const { isTabletUp } = useMediaQuery();
  return isTabletUp && <span className="pagination-list">{children}</span>;
}

export interface PaginationPageProps extends React.ComponentProps<typeof Button> {
  href: string;
  children: string;
  current?: boolean;
}

export function PaginationPage({
  href,
  children,
  current = false,
  ...props
}: PaginationPageProps) {
  return (
    <Button
      href={href}
      aria-label={`Page ${children}`}
      aria-current={current ? "page" : undefined}
      variant={current ? "primary" : "subtle"}
      className={clsx()}
      {...props}
    >
      <span className="">{children}</span>
    </Button>
  );
}

export function PaginationGap() {
  return (
    <div aria-hidden="true" className="">
      &hellip;
    </div>
  );
}
