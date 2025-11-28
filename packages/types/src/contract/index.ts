import { SolarInstallationTypeLabel } from "../solar";

export type ContractModel = {
  contractInfo: {
    contractId: number;
    contractDate: string;
    contractAmount: number;
  };
  quoteInfo: {
    quoteName: string;
    structureType: SolarInstallationTypeLabel;
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
  constructionPhotos: [
    {
      contractPhotoId: number;
      imageId: number;
      imageUrl: string;
      isRepresentative: true;
    },
  ];
  createdAt: string;
  updatedAt: string;
};
