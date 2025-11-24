import { SolarInstallationType, SolarStructureType } from "@repo/types";

export type GetQuotesDto = {
  installationType: SolarInstallationType;
  structureType: SolarStructureType;
  myApplication?: boolean;
  page?: number;
  size?: number;
};
