import {
  ApiResponse,
  PaginationResponseData,
  QuoteStatus,
  QuoteStatusLabel,
  SolarInstallationType,
  SolarInstallationTypeLabel,
  SolarStructureType,
  SolarStructureTypeLabel,
} from "@repo/types";

export type QuoteModel = {
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
};

export type BidsModel = {
  bidId: number;
  partnerId: number;
  companyName: string;
  logoUrl: string;
  bidPrice: number;
};

export type GetQuoteDetailModel = ApiResponse<{
  quote: QuoteModel;
  bids: PaginationResponseData<BidsModel>;
  isMyQuote: boolean | null;
  hasMyBid: boolean | null;
  myBidId: number | null;
}>;
