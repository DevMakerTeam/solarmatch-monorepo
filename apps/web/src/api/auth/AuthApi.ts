import instance from "@/utils/instance";
import { AxiosInstance } from "axios";
import { SignupDto } from "./types/dto/signup-dto";
import { SignupModel } from "./types/model/signup-model";
import { LoginDto } from "./types/dto/login-dto";
import { LoginModel } from "./types/model/login-model";
import { LogoutModel } from "./types/model/logout-model";
import { MeModel } from "./types/model/me-model";
import { RefreshDto } from "./types/dto/refresh-dto";
import { RefreshModel } from "./types/model/refresh-model";
import { FindAccountDto } from "./types/dto/find-account-dto";
import { FindAccountModel } from "./types/model/find-account-model";
import { PasswordResetConfirmDto } from "./types/dto/password-reset-confirm-dto";
import { PasswordResetConfirmModel } from "./types/model/password-reset-confirm-model";
import { PasswordResetRequestDto } from "./types/dto/password-reset-request-dto";
import { PasswordResetRequestModel } from "./types/model/password-reset-request-model";
import { KakaoAuthDto } from "./types/dto/kakao-auto-dto";
import { KakaoAuthModel } from "./types/model/kakao-auto-model";
import { WithdrawModel } from "./types/model/withdraw-model";
import { PasswordChangeDto } from "./types/dto/password-change-dto";
import { PasswordChangeModel } from "./types/model/password-change-model";

export class AuthApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  // 회원가입
  signup = async (req: SignupDto): Promise<SignupModel> => {
    const { data } = await this.axios({
      method: "POST",
      url: "/api/auth/signup",
      data: req,
    });

    return data;
  };

  // 로그인
  login = async (req: LoginDto): Promise<LoginModel> => {
    const { data } = await this.axios({
      method: "POST",
      url: "/api/auth/login",
      data: req,
    });

    return data;
  };

  // 로그아웃
  logout = async (): Promise<LogoutModel> => {
    const { data } = await this.axios({
      method: "POST",
      url: "/api/auth/logout",
    });

    return data;
  };

  // 내 정보 조회
  me = async (): Promise<MeModel> => {
    const { data } = await this.axios({
      method: "GET",
      url: "/api/auth/me",
    });

    return data;
  };

  // 액세스 토큰 갱신
  refresh = async (req: RefreshDto): Promise<RefreshModel> => {
    const { data } = await this.axios({
      method: "POST",
      url: "/api/auth/refresh",
      data: req,
    });

    return data;
  };

  // 계정 찾기
  findAccount = async (req: FindAccountDto): Promise<FindAccountModel> => {
    const { data } = await this.axios({
      method: "POST",
      url: "/api/auth/find-account",
      data: req,
    });

    return data;
  };

  // 비밀번호 재설정
  passwordResetConfirm = async (
    req: PasswordResetConfirmDto
  ): Promise<PasswordResetConfirmModel> => {
    const { data } = await this.axios({
      method: "POST",
      url: "/api/auth/password-reset/confirm",
      data: req,
    });

    return data;
  };

  // 비밀번호 재설정 요청
  passwordResetRequest = async (
    req: PasswordResetRequestDto
  ): Promise<PasswordResetRequestModel> => {
    const { data } = await this.axios({
      method: "POST",
      url: "/api/auth/password-reset/request",
      data: req,
    });

    return data;
  };

  // 카카오 로그인/회원가입
  kakaoAuth = async (req: KakaoAuthDto): Promise<KakaoAuthModel> => {
    const { data } = await this.axios({
      method: "POST",
      url: "/api/auth/kakao/auth",
      data: req,
    });

    return data;
  };

  // 회원탈퇴
  withdraw = async (): Promise<WithdrawModel> => {
    const { data } = await this.axios({
      method: "DELETE",
      url: "/api/auth/withdraw",
    });

    return data;
  };

  // 비밀번호 변경
  passwordChange = async (
    req: PasswordChangeDto
  ): Promise<PasswordChangeModel> => {
    const { data } = await this.axios({
      method: "POST",
      url: "/api/auth/password/change",
      data: req,
    });

    return data;
  };
}

const authApi = new AuthApi();

export default authApi;
