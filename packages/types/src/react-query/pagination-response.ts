import { ApiResponse } from "./api-response";

export type PaginationResponseData<
  T = Record<string, unknown> | string | number | boolean | unknown[],
> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};

export type PaginationResponse<
  T = Record<string, unknown> | string | number | boolean | unknown[],
> = ApiResponse<PaginationResponseData<T>>;
