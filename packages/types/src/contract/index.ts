import { SolarInstallationTypeLabel, SolarStructureTypeLabel } from "../solar";

export type ConstructionPhotoModel = {
  contractPhotoId: number;
  imageId: number;
  imageUrl: string;
  isRepresentative: true;
};

export type ContractModel = {
  contractInfo: {
    contractId: number;
    contractDate: string;
    contractAmount: number;
  };
  quoteInfo: {
    quoteName: string;
    structureType: SolarStructureTypeLabel;
    installationType: SolarInstallationTypeLabel;
    baseAddress: string;
    detailAddress: string;
    plannedCapacity: number;
    currentCapacity: number;
    monthlyAverageUsage: number;
    other: string;
  };
  bidInfo: {
    companyName: string;
    bidPrice: number;
    solarModule: string;
    solarModuleOrigin: string;
    inverter: string;
    inverterOrigin: string;
    structure: string;
    asInfo: string;
    memo: string;
  };
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  installationReview: string;
  constructionPhotos: ConstructionPhotoModel[];
  createdAt: string;
  updatedAt: string;
};
