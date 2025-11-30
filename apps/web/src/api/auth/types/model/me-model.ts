import {
  ApiResponse,
  ApplyStatus,
  ContractCaseItem,
  PartnerInfoType,
  Provider,
  Role,
} from "@repo/types";

/**
 * @param id 사용자 ID
 * @param email 이메일
 * @param name 이름
 * @param phone 전화번호
 * @param provider 가입 방법
 * @param role 사용자 역할
 * @param isActive 계정 활성화 여부
 * @param createdAt 가입일
 * @param partnerStatus 파트너 지원 상태 (null: 파트너 지원 한적x, PENDING: 파트너 지원 대기 중, APPROVED: 파트너 승인됨, REJECTED: 파트너 반려됨)
 * @param partner 파트너 정보
 */
export type MeModel = ApiResponse<{
  id: number;
  email: string;
  name: string;
  phone: string;
  provider: Provider;
  role: Role;
  isActive: boolean;
  createdAt: string;
  partnerStatus: ApplyStatus | null;
  partner?: PartnerInfoType;
  recentContractCases?: ContractCaseItem[];
}>;
