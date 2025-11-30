import { ApiResponse, ContractModel } from "@repo/types";

export type GetContractCaseDetailModel = ApiResponse<
  Omit<ContractModel, "customerInfo">
>;
