import { ApiResponse } from "@repo/types";

export type ImageUploadModel = ApiResponse<
  {
    id: number;
    url: string;
  }[]
>;
