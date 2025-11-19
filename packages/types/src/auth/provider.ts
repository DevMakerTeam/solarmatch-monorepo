export const PROVIDERS = ["LOCAL", "KAKAO"] as const;

export type Provider = (typeof PROVIDERS)[number];
