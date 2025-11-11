import externalInstance from "@/utils/externalInstance";
import { AxiosInstance } from "axios";
import { VerifyCodeDto } from "./types/dto/verify-code-dto";
import { VerifyCodeModel } from "./types/model/verify-code-model";
import { SendVerificationDto } from "./types/dto/send-verification-dto";
import { SendVerificationModel } from "./types/model/send-verification-model";

export class EmailApi {
  axios: AxiosInstance = externalInstance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  // 이메일 인증 코드 전송
  sendVerification = async (
    req: SendVerificationDto
  ): Promise<SendVerificationModel> => {
    const { data } = await this.axios({
      method: "POST",
      url: "/api/email/send-verification",
      data: req,
    });

    return data;
  };

  // 인증 코드 확인
  verifyCode = async (req: VerifyCodeDto): Promise<VerifyCodeModel> => {
    const { data } = await this.axios({
      method: "POST",
      url: "/api/email/verify-code",
      data: req,
    });

    return data;
  };
}

const emailApi = new EmailApi();

export default emailApi;
