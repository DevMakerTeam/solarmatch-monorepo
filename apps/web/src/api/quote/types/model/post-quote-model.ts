import {
  ApiResponse,
  QuoteStatus,
  QuoteStatusLabel,
  SolarInstallationType,
  SolarInstallationTypeLabel,
  SolarStructureType,
  SolarStructureTypeLabel,
} from "@repo/types";

export type PostQuoteModel = ApiResponse<{
  id: number;
  userId: number;
  userName: string;
  installationType: SolarInstallationType;
  installationTypeLabel: SolarInstallationTypeLabel;
  structureType: SolarStructureType;
  structureTypeLabel: SolarStructureTypeLabel;
  baseAddress: string;
  detailAddress: string;
  currentCapacity: number;
  plannedCapacity: number;
  monthlyAverageUsage: number;
  otherRequests: string;
  imageUrls: string[];
  deadlineHours: number;
  bidStartDate: string;
  deadlineDate: string;
  remainingHours: number;
  status: QuoteStatus;
  statusLabel: QuoteStatusLabel;
  bidCount: number;
  createdAt: string;
}>;
