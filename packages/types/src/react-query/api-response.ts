export type ApiResponse<
  T = Record<string, unknown> | string | number | boolean,
> = {
  success: boolean;
  message: string;
  data: T;
};
