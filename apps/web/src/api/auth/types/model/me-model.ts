import { ApiResponse } from "@repo/types";

export type MeModel = ApiResponse<{
  id: number;
  email: string;
  name: string;
  phone: string;
  provider: string;
  isActive: boolean;
  createdAt: string;
}>;
