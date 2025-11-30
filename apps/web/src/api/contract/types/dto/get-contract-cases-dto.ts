import { PaginationParams } from "@repo/types";

export type GetContractCasesDto = Omit<PaginationParams, "size">;
