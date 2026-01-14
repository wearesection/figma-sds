
import {
  Pagination,
  PaginationGap,
  PaginationList as PaginationListWrapper,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from "primitives";
import type React from "react";

export interface PaginationListProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  "aria-label"?: string;
}

export function PaginationList({
  currentPage,
  totalPages,
  onPageChange,
  className,
  "aria-label": ariaLabel = "Pagination",
}: PaginationListProps) {
  const getVisiblePages = (current: number, total: number) => {
    const pages: (number | "gap")[] = [];

    // If total pages is small, show all
    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Always include first page
    pages.push(1);

    // Logic for start: display 5 pages upfront if current page is small
    // [1, 2, 3, 4, 5, ..., total]
    if (current < 5) {
      for (let i = 2; i <= 5; i++) {
        pages.push(i);
      }
      pages.push("gap");
      pages.push(total);
      return pages;
    }

    // Logic for end: display last few pages if current page is near end
    // [1, ..., total-4, total-3, total-2, total-1, total]
    if (current > total - 4) {
      pages.push("gap");
      for (let i = total - 4; i <= total; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Logic for middle
    // [1, ..., current-1, current, current+1, ..., total]
    pages.push("gap");
    pages.push(current - 1);
    pages.push(current);
    pages.push(current + 1);
    pages.push("gap");
    pages.push(total);

    return pages;
  };

  const visiblePages = getVisiblePages(currentPage, totalPages);

  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    onPageChange(page);
  };

  return (
    <Pagination className={className} aria-label={ariaLabel}>
      <PaginationPrevious
        onClick={handlePrevious}
        href={currentPage > 1 ? `#` : null}
      />
      <PaginationListWrapper>
        {visiblePages.map((item, index) => {
          if (item === "gap") {
            return <PaginationGap key={`gap-${index}`} />;
          }
          return (
            <PaginationPage
              key={item}
              href="#"
              current={item === currentPage}
              onClick={handlePageClick(item)}
            >
              {item.toString()}
            </PaginationPage>
          );
        })}
      </PaginationListWrapper>
      <PaginationNext
        onClick={handleNext}
        href={currentPage < totalPages ? `#` : null}
      />
    </Pagination>
  );
}
