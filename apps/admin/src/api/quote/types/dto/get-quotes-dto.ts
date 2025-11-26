import { SolarInstallationType, SolarStructureType } from "@repo/types";

export type GetQuotesDto = {
  installationType?: SolarInstallationType;
  structureType?: SolarStructureType;
  page?: number;
  size?: number;
};
