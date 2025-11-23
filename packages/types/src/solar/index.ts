export const SOLAR_STRUCTURE_TYPES = {
  RESIDENTIAL_SOLAR: "residential-solar",
  COMMERCIAL_PPA: "commercial-ppa",
  MAINTENANCE_AS: "maintenance-as",
  INSURANCE_WARRANTY: "insurance-warranty",
  MOWING_DRONE: "mowing-drone",
} as const;

export type SolarStructureType =
  (typeof SOLAR_STRUCTURE_TYPES)[keyof typeof SOLAR_STRUCTURE_TYPES];

export const SOLAR_STRUCTURE_TYPE_LABELS = {
  [SOLAR_STRUCTURE_TYPES.RESIDENTIAL_SOLAR]: "주택용 태양광",
  [SOLAR_STRUCTURE_TYPES.COMMERCIAL_PPA]: "상업용 PPA",
  [SOLAR_STRUCTURE_TYPES.MAINTENANCE_AS]: "유지관리·A/S",
  [SOLAR_STRUCTURE_TYPES.INSURANCE_WARRANTY]: "보험·보증",
  [SOLAR_STRUCTURE_TYPES.MOWING_DRONE]: "예초·드론",
} as const satisfies Record<SolarStructureType, string>;

export type SolarStructureTypeLabel =
  (typeof SOLAR_STRUCTURE_TYPE_LABELS)[SolarStructureType];

export const SOLAR_INSTALLATION_TYPES = {
  ROOF: "roof",
  CANOPY: "canopy",
  BUILDING: "building",
  DESIGN: "design",
  SMALL: "small",
} as const;

export type SolarInstallationType =
  (typeof SOLAR_INSTALLATION_TYPES)[keyof typeof SOLAR_INSTALLATION_TYPES];

export const SOLAR_INSTALLATION_TYPE_LABELS = {
  [SOLAR_INSTALLATION_TYPES.ROOF]: "지붕형(기본형)",
  [SOLAR_INSTALLATION_TYPES.CANOPY]: "캐노피형",
  [SOLAR_INSTALLATION_TYPES.BUILDING]: "건물일체형",
  [SOLAR_INSTALLATION_TYPES.DESIGN]: "디자인형",
  [SOLAR_INSTALLATION_TYPES.SMALL]: "소형·발코니형",
} as const satisfies Record<SolarInstallationType, string>;

export type SolarInstallationTypeLabel =
  (typeof SOLAR_INSTALLATION_TYPE_LABELS)[SolarInstallationType];

export const SOLAR_INSTALLATION_TYPE_DESCRIPTIONS: Record<
  SolarInstallationType,
  string
> = {
  [SOLAR_INSTALLATION_TYPES.ROOF]:
    "슬레이트/기와/샌드위치패널/옥상 등 지붕 위 설치 가장 저렴하고 보편적인 방식",
  [SOLAR_INSTALLATION_TYPES.CANOPY]: "주차장, 마당에 캐노피(차양) 겸용 설치",
  [SOLAR_INSTALLATION_TYPES.BUILDING]:
    "태양광 기와, 외벽 등 건축 자재와 일체형 미관/디자인 중시, 고급 주택용",
  [SOLAR_INSTALLATION_TYPES.DESIGN]:
    "정자, 파고라, 조경 시설과 결합. 전원주택, 고급 주택 맞춤형",
  [SOLAR_INSTALLATION_TYPES.SMALL]:
    "아파트/빌라 발코니, 베란다 설치. 소규모 발전, 임대주택/도심형 적합",
};
