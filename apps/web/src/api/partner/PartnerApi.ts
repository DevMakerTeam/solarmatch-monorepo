import instance from "@/utils/instance";
import { AxiosInstance } from "axios";
import { ApplyDto } from "./types/dto/apply-dto";
import { ApplyModel } from "./types/model/apply-model";
import { MyApplicationModel } from "./types/model/my-application-model";

class PartnerApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  // 파트너 신청
  apply = async (req: ApplyDto): Promise<ApplyModel> => {
    const { data } = await this.axios({
      method: "POST",
      url: "/api/partner/apply",
      data: req,
    });
    return data;
  };

  // 내 파트너 신청 조회
  myApplication = async (): Promise<MyApplicationModel> => {
    const { data } = await this.axios({
      method: "GET",
      url: "/api/partner/my-application",
    });

    return data;
  };
}

const partnerApi = new PartnerApi();

export default partnerApi;
