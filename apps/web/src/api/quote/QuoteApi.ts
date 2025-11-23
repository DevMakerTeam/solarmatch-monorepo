import instance from "@/utils/instance";
import { AxiosInstance } from "axios";
import { PostQuoteDto } from "./types/dto/post-quote-dto";
import { PostQuoteModel } from "./types/model/post-quote-model";

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
}

const quoteApi = new QuoteApi();

export default quoteApi;
