import { ApiResponse } from "@repo/types";

export type AccountProviderType = "LOCAL" | "KAKAO";

export type FindAccountModel = ApiResponse<{
  maskedEmail: string;
  provider: AccountProviderType;
  createdAt: string;
}>;
