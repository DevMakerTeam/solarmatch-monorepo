import { AxiosInstance } from "axios";
import instance from "@/utils/instance";
import { GetBidDetailModel } from "./types/model/get-bid-detail-model";
import { AcceptBidModel } from "./types/model/accept-bid-model";
import { CancelBidModel } from "./types/model/cancel-bid-model";
import { RequestBidDto } from "./types/dto/request-bid-dto";
import { RequestBidModel } from "./types/model/request-bid-model";
import { GetBidDetailDto } from "./types/dto/get-bid-detail-dto";

export class BidApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  // 입찰 상세 조회 (사용자)
  getBidDetail = async ({
    bidId,
    ...params
  }: GetBidDetailDto): Promise<GetBidDetailModel> => {
    const { data } = await this.axios({
      method: "GET",
      url: `/api/bid/${bidId}`,
      params,
    });

    return data;
  };

  // 입찰 수락 (계약하기) (사용자)
  acceptBid = async (bidId: number): Promise<AcceptBidModel> => {
    const { data } = await this.axios({
      method: "POST",
      url: `/api/bid/${bidId}/accept`,
    });

    return data;
  };

  // 입찰 취소 (파트너)
  cancelBid = async (bidId: number): Promise<CancelBidModel> => {
    const { data } = await this.axios({
      method: "DELETE",
      url: `/api/bid/${bidId}`,
    });

    return data;
  };

  // 입찰 요청 (파트너)
  requestBid = async ({
    quoteId,
    ...req
  }: RequestBidDto): Promise<RequestBidModel> => {
    const { data } = await this.axios({
      method: "POST",
      url: `/api/bid/${quoteId}`,
      data: req,
    });

    return data;
  };
}

const bidApi = new BidApi();

export default bidApi;
