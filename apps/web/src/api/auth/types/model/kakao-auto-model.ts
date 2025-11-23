import { ApiResponse } from "@repo/types";

export type KakaoAuthModel = ApiResponse<{
  socialId: number;
  email: string;
  phone: string;
  name: string;
  emailVerified: boolean;
  phoneVerified: boolean;
}>;
