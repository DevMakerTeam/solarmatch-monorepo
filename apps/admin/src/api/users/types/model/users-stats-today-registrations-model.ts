import { ApiResponse } from "@repo/types";

export type UsersStatsTodayRegistrationsModel = ApiResponse<{
  total: number;
  partner: number;
}>;
