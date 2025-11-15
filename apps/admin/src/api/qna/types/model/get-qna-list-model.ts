import { PaginationResponse } from "@repo/types";

export type GetQnaListModel = PaginationResponse<{
  id: number;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}>;
