import { ApiResponse } from "@repo/types";

export type RefreshModel = ApiResponse<{
  accessToken: string;
  tokenType: string;
}>;
