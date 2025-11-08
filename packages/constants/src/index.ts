export const SOLAR_STRUCTURE_TYPES = {
  RESIDENTIAL_SOLAR: "residential-solar",
  COMMERCIAL_PPA: "commercial-ppa",
  MAINTENANCE_AS: "maintenance-as",
  INSURANCE_WARRANTY: "insurance-warranty",
  MOWING_DRONE: "mowing-drone",
} as const;

export type SolarStructureType =
  (typeof SOLAR_STRUCTURE_TYPES)[keyof typeof SOLAR_STRUCTURE_TYPES];

export const SOLAR_STRUCTURE_TYPE_LABELS: Record<SolarStructureType, string> = {
  [SOLAR_STRUCTURE_TYPES.RESIDENTIAL_SOLAR]: "주택용 태양광",
  [SOLAR_STRUCTURE_TYPES.COMMERCIAL_PPA]: "상업용 PPA",
  [SOLAR_STRUCTURE_TYPES.MAINTENANCE_AS]: "유지관리·A/S",
  [SOLAR_STRUCTURE_TYPES.INSURANCE_WARRANTY]: "보험·보증",
  [SOLAR_STRUCTURE_TYPES.MOWING_DRONE]: "예초·드론",
};
