import { ApiResponse, Provider } from "@repo/types";

export type FindAccountModelData = {
  maskedEmail: string;
  provider: Provider;
  createdAt: string;
};

export type FindAccountModel = ApiResponse<FindAccountModelData[]>;
