import { ApiResponse } from "@repo/types";

export type CreateQnaModel = ApiResponse<{
  id: number;
  question: string;
  answer: string;
  createdAt: string;
}>;
