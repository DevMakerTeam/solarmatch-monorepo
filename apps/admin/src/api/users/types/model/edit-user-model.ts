import { ApiResponse, PartnerInfoType, Provider, Role } from "@repo/types";

export type EditUserModel = ApiResponse<{
  id: number;
  email: string;
  name: string;
  phone: string;
  provider: Provider;
  role: Role;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  partnerInfo?: PartnerInfoType;
}>;
