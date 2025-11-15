import { ApiResponse } from "@repo/types";

export type EditQnaModel = ApiResponse<{
  id: number;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}>;
