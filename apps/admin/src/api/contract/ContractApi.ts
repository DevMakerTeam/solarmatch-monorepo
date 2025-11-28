import instance from "@/utils/instance";
import { AxiosInstance } from "axios";
import { GetContractsDto } from "./types/dto/get-contracts-dto";
import { GetContractsModel } from "./types/model/get-contracts-model";
import { GetContractDetailModel } from "./types/model/get-contract-detail-model";
import { EditContractDto } from "./types/dto/edit-contract-dto";
import { EditContractModel } from "./types/model/edit-contract-model";

export class ContractApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  // 계약 목록 조회 (관리자)
  getContracts = async (
    params?: GetContractsDto
  ): Promise<GetContractsModel> => {
    const { data } = await this.axios({
      method: "GET",
      url: "/api/admin/contract",
      params,
    });

    return data;
  };

  // 계약 상세 조회 (관리자)
  getContractDetail = async (
    contractId: number
  ): Promise<GetContractDetailModel> => {
    const { data } = await this.axios({
      method: "GET",
      url: `/api/admin/contract/${contractId}`,
    });

    return data;
  };

  // 계약 수정 (관리자)
  editContract = async ({
    contractId,
    ...req
  }: EditContractDto): Promise<EditContractModel> => {
    const { data } = await this.axios({
      method: "PATCH",
      url: `/api/admin/contract/${contractId}`,
      data: req,
    });

    return data;
  };
}

const contractApi = new ContractApi();

export default contractApi;
