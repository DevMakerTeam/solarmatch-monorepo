export const ROLES = ["USER", "ADMIN", "PARTNER"] as const;

export type Role = (typeof ROLES)[number];
