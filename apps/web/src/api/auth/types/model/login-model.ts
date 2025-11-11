import { ApiResponse } from "@repo/types";

export type LoginModel = ApiResponse<{
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  userId: number;
  email: string;
  name: string;
}>;
