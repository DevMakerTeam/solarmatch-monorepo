import instance from "@/utils/instance";
import { AxiosInstance } from "axios";
import { SignupDto } from "./types/dto/signup-dto";
import { SignupModel } from "./types/model/signup-model";

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
}

const authApi = new AuthApi();

export default authApi;
