import { ApiResponse } from "@repo/types";

export type SignupModel = ApiResponse<{
  id: number;
  email: string;
  name: string;
  phone: string;
  createdAt: string;
}>;
