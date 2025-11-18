export const PARTNER_REGIONS = [
  "강원",
  "서울/경기",
  "경남",
  "경북",
  "광주",
  "대구",
  "대전",
  "부산",
  "울산",
  "인천",
  "전남",
  "전북",
  "제주",
  "충남",
  "충북",
] as const;

export type PartnerRegion = (typeof PARTNER_REGIONS)[number];
