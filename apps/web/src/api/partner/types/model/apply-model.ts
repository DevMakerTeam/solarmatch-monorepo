import { ApiResponse, ApplyStatus, PartnerRegion } from "@repo/types";

export type ApplyModel = ApiResponse<{
  userId: number;
  companyName: string;
  address: string;
  phone: string;
  representativeName: string;
  companyEmail: string;
  experienceYears: number;
  serviceAreas: PartnerRegion[];
  companyIntroduction: string;
  status: ApplyStatus;
  createdAt: string;
  updatedAt: string;
}>;
