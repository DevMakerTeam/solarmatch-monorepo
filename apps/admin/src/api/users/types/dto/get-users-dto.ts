import { PaginationParams, Role } from "@repo/types";

export interface GetUsersDto extends PaginationParams {
  type: Omit<Role, "ADMIN">;
  showDeletedOnly?: boolean;
}
