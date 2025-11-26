import {
  SolarInstallationType,
  SolarInstallationTypeLabel,
  SolarStructureType,
  SolarStructureTypeLabel,
} from "../solar";

export const QUOTE_STATUS = {
  WAITING: "WAITING",
  COMPLETED: "COMPLETED",
  CLOSED: "CLOSED",
  CANCELLED: "CANCELLED",
} as const;

export type QuoteStatus = (typeof QUOTE_STATUS)[keyof typeof QUOTE_STATUS];

export const QUOTE_STATUS_LABELS = {
  [QUOTE_STATUS.WAITING]: "입찰대기",
  [QUOTE_STATUS.COMPLETED]: "입찰완료",
  [QUOTE_STATUS.CLOSED]: "입찰마감",
  [QUOTE_STATUS.CANCELLED]: "입찰취소",
} as const satisfies Record<QuoteStatus, string>;

export type QuoteStatusLabel = (typeof QUOTE_STATUS_LABELS)[QuoteStatus];

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
