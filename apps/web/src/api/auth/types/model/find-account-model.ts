import { ApiResponse } from "@repo/types";

export type AccountProviderType = "LOCAL" | "KAKAO";

export type FindAccountModelData = {
  maskedEmail: string;
  provider: AccountProviderType;
  createdAt: string;
};

export type FindAccountModel = ApiResponse<FindAccountModelData[]>;
