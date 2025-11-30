import instance from "@/utils/instance";
import { AxiosInstance } from "axios";
import { GetContractCasesDto } from "./types/dto/get-contract-cases-dto";
import { GetContractCasesModel } from "./types/model/get-contract-cases-model";

export class ContractApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  // 시공사례 목록 조회
  getContractCases = async (
    params?: GetContractCasesDto
  ): Promise<GetContractCasesModel> => {
    const { data } = await this.axios({
      method: "GET",
      url: "/api/contract/cases",
      params,
    });

    return data;
  };
}

const contractApi = new ContractApi();

export default contractApi;
