export const ORDER_TYPES = {
  RESIDENTIAL_SOLAR: "residential-solar", // 주택용 태양광
  COMMERCIAL_PPA: "commercial-ppa", // 상업용 PPA
  MAINTENANCE_AS: "maintenance-as", // 유지관리·A/S
  INSURANCE_WARRANTY: "insurance-warranty", // 보험·보증
  MOWING_DRONE: "mowing-drone", // 예초·드론
} as const;

export type OrderType = (typeof ORDER_TYPES)[keyof typeof ORDER_TYPES];

export const ORDER_TYPE_LABELS: Record<OrderType, string> = {
  [ORDER_TYPES.RESIDENTIAL_SOLAR]: "주택용 태양광",
  [ORDER_TYPES.COMMERCIAL_PPA]: "상업용 PPA",
  [ORDER_TYPES.MAINTENANCE_AS]: "유지관리·A/S",
  [ORDER_TYPES.INSURANCE_WARRANTY]: "보험·보증",
  [ORDER_TYPES.MOWING_DRONE]: "예초·드론",
};
