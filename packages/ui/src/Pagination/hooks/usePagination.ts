import { UsePaginationProps } from "../types";

export const usePagination = ({
  currentPage,
  totalPages,
}: UsePaginationProps) => {
  const getPageNumbers = (): number[] => {
    const pages = [];
    const maxPages = 5;

    if (totalPages <= maxPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage, -2);
      let endPage = Math.min(totalPages, startPage + maxPages - 1);

      if (endPage - startPage < maxPages - 1) {
        startPage = Math.max(1, endPage - maxPages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return {
    pageNumbers,
    canGoFirst: currentPage > 1,
    canGoPrev: currentPage > 1,
    canGoNext: currentPage < totalPages,
    canGoLast: currentPage < totalPages,
  };
};
