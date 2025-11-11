import externalInstance from "@/utils/externalInstance";
import { AxiosInstance } from "axios";
import { SendVerificationDto } from "./types/dto/send-verification-dto";
import { SendVerificationModel } from "./types/model/send-verification-model";
import { VerifyCodeDto } from "./types/dto/verify-code-dto";
import { VerifyCodeModel } from "./types/model/verify-code-model";

export class SmsApi {
  axios: AxiosInstance = externalInstance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  // SMS 인증 코드 발송
  sendVerification = async (
    req: SendVerificationDto
  ): Promise<SendVerificationModel> => {
    const { data } = await this.axios({
      method: "POST",
      url: "/api/sms/send-verification",
      data: req,
    });

    return data;
  };

  // SMS 인증 코드 검증
  verifyCode = async (req: VerifyCodeDto): Promise<VerifyCodeModel> => {
    const { data } = await this.axios({
      method: "POST",
      url: "/api/sms/verify-code",
      data: req,
    });

    return data;
  };
}

const smsApi = new SmsApi();

export default smsApi;
