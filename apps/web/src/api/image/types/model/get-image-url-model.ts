import { ApiResponse } from "@repo/types";

export type GetImageUrlModel = ApiResponse<{
  id: number;
  url: string;
  imageType: string;
  originalFilename: string;
  fileSize: number;
  contentType: string;
  folder: string;
  createdAt: string;
}>;
