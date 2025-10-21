export interface UsePaginationProps {
  currentPage: number;
  totalPages: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
