import {
  PaginationResponse,
  QuoteStatus,
  QuoteStatusLabel,
  SolarInstallationType,
  SolarInstallationTypeLabel,
  SolarStructureType,
  SolarStructureTypeLabel,
} from "@repo/types";

export type GetQuotesModel = PaginationResponse<{
  id: number;
  userId: number;
  userName: number;
  installationType: SolarInstallationType;
  installationTypeLabel: SolarInstallationTypeLabel;
  structureType: SolarStructureType;
  structureTypeLabel: SolarStructureTypeLabel;
  baseAddress: string;
  detailAddress: string;
  currentCapacity: number;
  plannedCapacity: number;
  monthlyAverageUsage: number;
  otherRequests: number;
  imageUrls: string[];
  deadlineHours: number;
  bidStartDate: string;
  deadlineDate: string;
  remainingHours: number;
  status: QuoteStatus;
  statusLabel: QuoteStatusLabel;
  bidCount: number;
  createdAt: number;
}>;
