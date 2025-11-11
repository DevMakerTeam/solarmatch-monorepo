export type ApiResponse<
  T = Record<string, unknown> | string | number | boolean | unknown[],
> = {
  success: boolean;
  message: string;
  data: T;
};
