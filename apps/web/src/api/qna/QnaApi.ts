import instance from "@/utils/instance";
import { AxiosInstance } from "axios";
import { GetQnaListDto } from "./types/dto/get-qna-list-dto";
import { GetQnaListModel } from "./types/model/get-qna-list-model";

class QnaApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  // QnA 목록 조회
  getQnaList = async (params?: GetQnaListDto): Promise<GetQnaListModel> => {
    const { data } = await this.axios({
      method: "GET",
      url: "/api/qna",
      params,
    });

    return data;
  };
}

const qnaApi = new QnaApi();

export default qnaApi;
