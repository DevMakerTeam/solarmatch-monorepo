import {
  ApplyStatus,
  PaginationResponse,
  PartnerInfoType,
  Role,
} from "@repo/types";

export type UserInfoType = {
  id: number;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  partnerStatus: ApplyStatus;
};

export type GetUsersModel = PaginationResponse<{
  category: Omit<Role, "ADMIN">;
  userInfo: UserInfoType;
  partnerInfo: PartnerInfoType | null;
}>;
