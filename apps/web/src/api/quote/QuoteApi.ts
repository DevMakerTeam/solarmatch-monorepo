import instance from "@/utils/instance";
import { AxiosInstance } from "axios";
import { PostQuoteDto } from "./types/dto/post-quote-dto";
import { PostQuoteModel } from "./types/model/post-quote-model";
import { GetQuotesDto } from "./types/dto/get-quotes-dto";
import { GetQuotesModel } from "./types/model/get-quotes-model";
import { GetQuoteDetailDto } from "./types/dto/get-quote-detail-dto";
import { GetQuoteDetailModel } from "./types/model/get-quote-detail-model";

class QuoteApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  // 견적 요청
  postQuote = async (req: PostQuoteDto): Promise<PostQuoteModel> => {
    const { data } = await this.axios({
      method: "POST",
      url: "/api/quote",
      data: req,
    });

    return data;
  };

  // 견적 목록 조회
  getQuotes = async (req: GetQuotesDto): Promise<GetQuotesModel> => {
    const { data } = await this.axios({
      method: "GET",
      url: "/api/quote",
      params: req,
    });

    return data;
  };

  // 견적 상세 조회
  getQuoteDetail = async ({
    quoteId,
    ...params
  }: GetQuoteDetailDto): Promise<GetQuoteDetailModel> => {
    const { data } = await this.axios({
      method: "GET",
      url: `/api/quote/${quoteId}`,
      params,
    });

    return data;
  };
}

const quoteApi = new QuoteApi();

export default quoteApi;
