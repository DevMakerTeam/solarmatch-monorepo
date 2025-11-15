import { ApiResponse } from "./api-response";

export type PaginationResponse<
  T = Record<string, unknown> | string | number | boolean | unknown[],
> = ApiResponse<{
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}>;
