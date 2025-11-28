export type EditContractDto = {
  contractId: number;
  solarModule?: string;
  solarModuleOrigin?: string;
  inverter?: string;
  inverterOrigin?: string;
  structure: string;
  installationReview?: string;
  addPhotoImageIds?: number[] | null;
  deletePhotoIds?: number[] | null;
};
