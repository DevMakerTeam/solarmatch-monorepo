import instance from "@/utils/instance";
import { AxiosInstance } from "axios";
import { GetQuotesDto } from "./types/dto/get-quotes-dto";
import { GetQuotesModel } from "./types/model/get-quotes-model";
import { EditQuoteDto } from "./types/dto/edit-quote-dto";
import { EditQuoteModel } from "./types/model/edit-quote-dto";

export class QuoteApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  // 견적 목록 조회 (관리자)
  getQuotes = async (params?: GetQuotesDto): Promise<GetQuotesModel> => {
    const { data } = await this.axios({
      method: "GET",
      url: "/api/admin/quote",
      params,
    });

    return data;
  };

  // 견적 수정 (관리자)
  editQuote = async ({
    quoteId,
    ...req
  }: EditQuoteDto): Promise<EditQuoteModel> => {
    const { data } = await this.axios({
      method: "PUT",
      url: `/api/admin/quote/${quoteId}`,
      data: req,
    });

    return data;
  };
}

const quoteApi = new QuoteApi();

export default quoteApi;
