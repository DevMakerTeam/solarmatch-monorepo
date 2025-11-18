import { PartnerRegion } from "@repo/types";

/**
 * @param companyName 업체명
 * @param baseAddress 업체 기본 주소
 * @param detailAddress 업체 상세 주소
 * @param phone 업체 전화번호
 * @param representativeName 대표자 성명
 * @param companyEmail 업체 이메일 주소
 * @param experienceYears 활동경력
 * @param serviceAreas 활동 가능 지역
 * @param logoImageId 로고 이미지 ID
 * @param companyIntroduction 업체 소개글
 */
export type ApplyDto = {
  companyName: string;
  baseAddress: string;
  detailAddress: string;
  phone: string;
  representativeName: string;
  companyEmail: string;
  experienceYears: number;
  serviceAreas: PartnerRegion[];
  logoImageId?: number;
  companyIntroduction?: string;
};
