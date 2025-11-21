import { Role } from "@repo/types";

export interface UsersExcelDownloadDto {
  type: Omit<Role, "ADMIN">;
  showDeletedOnly?: boolean;
}
