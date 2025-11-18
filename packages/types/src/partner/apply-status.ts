export const APPLY_STATUS = ["PENDING", "APPROVED", "REJECTED"] as const;

export type ApplyStatus = (typeof APPLY_STATUS)[number];
