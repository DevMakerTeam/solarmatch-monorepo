import { SolarInstallationType, SolarStructureType } from "@repo/types";

export type PostQuoteDto = {
  installationType: SolarInstallationType;
  structureType: SolarStructureType;
  baseAddress: string;
  detailAddress: string;
  currentCapacity: number;
  plannedCapacity: number;
  monthlyAverageUsage: number;
  otherRequests: string;
  imageIds: number[];
};
