import {
  ApiResponse,
  ApplyStatus,
  PartnerRegion,
  Provider,
  Role,
} from "@repo/types";

export type Partner = {
  userId: number;
  companyName: string;
  baseAddress: string;
  detailAddress: string;
  logoUrl: string;
  phone: string;
  representativeName: string;
  companyEmail: string;
  experienceYears: number;
  serviceAreas: PartnerRegion[];
  companyIntroduction: string;
  status: ApplyStatus;
  createdAt: string;
  updatedAt: string;
};

export type MeModel = ApiResponse<{
  id: number;
  email: string;
  name: string;
  phone: string;
  provider: Provider;
  role: Role;
  isActive: boolean;
  createdAt: string;
  partner?: Partner;
}>;
