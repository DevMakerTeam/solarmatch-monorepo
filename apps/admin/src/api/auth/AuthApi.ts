import instance from "@/utils/instance";
import { AxiosInstance } from "axios";
import { LoginDto } from "./types/dto/login-dto";
import { LoginModel } from "./types/model/login-model";
import { LogoutModel } from "./types/model/logout-model";
import { RefreshDto } from "./types/dto/refresh-dto";
import { RefreshModel } from "./types/model/refresh-model";

export class AuthApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  // 로그인
  login = async (req: LoginDto): Promise<LoginModel> => {
    const { data } = await this.axios({
      method: "POST",
      url: "/api/admin/auth/login",
      data: req,
    });

    return data;
  };

  // 로그아웃
  logout = async (): Promise<LogoutModel> => {
    const { data } = await this.axios({
      method: "POST",
      url: "/api/admin/auth/logout",
    });

    return data;
  };

  // 관리자 액세스 토큰 갱신
  refresh = async (req: RefreshDto): Promise<RefreshModel> => {
    const { data } = await this.axios({
      method: "POST",
      url: "/api/admin/auth/refresh",
      data: req,
    });

    return data;
  };
}

const authApi = new AuthApi();

export default authApi;
