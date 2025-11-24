import { ImageUploadType } from "@repo/types";

export type ImageUploadDto = {
  files: File[];
  type: ImageUploadType;
};
