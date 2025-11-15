import { ApiResponse } from "@repo/types";

export type GetQnaDetailModel = ApiResponse<{
  id: number;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}>;
