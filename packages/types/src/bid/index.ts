import { QuoteStatus, QuoteStatusLabel } from "../quote";
import { PaginationResponseData } from "../react-query";

export type ContractCaseItem = {
  contractId: number;
  title: string;
  baseAddress: string;
  detailAddress: string;
  plannedCapacity: number;
  representativePhotoUrl: string;
};

export type BidResponse = {
  id: number;
  quoteId: number;
  partnerId: number;
  companyName: string;
  logoUrl: string;
  bidPrice: number;
  solarModule: string;
  solarModuleOrigin: string;
  inverter: string;
  inverterOrigin: string;
  structure: string;
  asInfo: string;
  memo: string;
  bidStatus: QuoteStatus;
  bidStatusLabel: QuoteStatusLabel;
  quoteStatus: QuoteStatus;
  quoteStatusLabel: QuoteStatusLabel;
  createdAt: string;
  companyIntroduction: string;
  contractCases: PaginationResponseData<ContractCaseItem>;
};
