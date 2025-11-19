import { ApiResponse, PartnerInfoType, Provider, Role } from "@repo/types";

/**
 * @param id 사용자 ID
 * @param name 이름
 * @param email 이메일
 * @param phone 전화번호
 * @param provider 가입 방법
 * @param role 사용자 역할
 * @param isActive 계정 활성화 여부
 * @param createdAt 가입일
 * @param updatedAt 수정일
 * @param deletedAt 탈퇴일
 * @param partnerInfo 파트너 정보
 */
export type GetUserDetailModel = ApiResponse<{
  id: number;
  name: string;
  email: string;
  phone: string;
  provider: Provider;
  role: Role;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  partnerInfo?: PartnerInfoType;
}>;
