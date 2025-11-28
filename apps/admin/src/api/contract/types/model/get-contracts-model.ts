import {
  PaginationResponse,
  SolarInstallationTypeLabel,
  SolarStructureTypeLabel,
} from "@repo/types";

export type GetContractsModel = PaginationResponse<{
  id: number;
  quoteId: number;
  bidId: number;
  contractName: string;
  structureType: SolarStructureTypeLabel;
  installationType: SolarInstallationTypeLabel;
  companyName: string;
  contractDate: string;
  contractAmount: number;
}>;
