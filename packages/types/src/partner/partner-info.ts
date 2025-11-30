import { ContractCaseItem } from "../bid";
import { PaginationResponseData } from "../react-query";
import { ApplyStatus } from "./apply-status";
import { PartnerRegion } from "./partner-regions";

/**
 * 시공 사례 모델
 * @param contractId 계약 ID
 * @param title 제목
 * @param baseAddress 기본 주소
 * @param detailAddress 상세 주소
 * @param plannedCapacity 설치 예정 용량
 * @param representativePhotoUrl 대표 사진
 */
export type ContractCasesModel = PaginationResponseData<ContractCaseItem>;

/**
 * @param userId 사용자 ID
 * @param companyName 업체명
 * @param baseAddress 업체 기본 주소
 * @param detailAddress 업체 상세 주소
 * @param logoUrl 업체 로고 이미지 URL (S3)
 * @param phone 업체 전화번호
 * @param representativeName 대표자 성명
 * @param companyEmail 업체 이메일 주소
 * @param experienceYears 활동경력 (년)
 * @param serviceAreas 활동 가능 지역
 * @param companyIntroduction 업체 소개글
 * @param status 파트너 신청 상태
 * @param createdAt 신청일
 * @param updatedAt 수정일
 * @param contractCases 시공 사례 목록 {@link ContractCasesModel}
 */
export type PartnerInfoType = {
  userId: number;
  companyName: string;
  baseAddress: string;
  detailAddress: string;
  logoUrl: string;
  phone: string;
  representativeName: string;
  companyEmail: string;
  experienceYears: number;
  serviceAreas: PartnerRegion[];
  companyIntroduction: string;
  status: ApplyStatus;
  createdAt: string;
  updatedAt: string;
  contractCases: ContractCasesModel;
};
