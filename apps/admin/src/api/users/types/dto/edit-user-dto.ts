import { ApplyStatus } from "@repo/types";

export type EditUserDto = {
  id: number;
  partnerStatus: ApplyStatus;
  companyName: string;
  companyIntroduction?: string;
  logoImageId?: number;
};
