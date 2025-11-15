import instance from "@/utils/instance";
import { AxiosInstance } from "axios";
import { CreateQnaDto } from "./types/dto/create-qna-dto";
import { CreateQnaModel } from "./types/model/create-qna-model";
import { EditQnaDto } from "./types/dto/edit-qna-dto";
import { EditQnaModel } from "./types/model/edit-qna-model";
import { DeleteQnaModel } from "./types/model/delete-qna-model";
import { GetQnaListDto } from "./types/dto/get-qna-list-dto";
import { GetQnaListModel } from "./types/model/get-qna-list-model";
import { GetQnaDetailModel } from "./types/model/get-qna-detail-model";

class QnaApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  // QnA 목록 조회
  getQnaList = async (params?: GetQnaListDto): Promise<GetQnaListModel> => {
    const { data } = await this.axios({
      method: "GET",
      url: "/api/admin/qna",
      params,
    });

    return data;
  };

  // QnA 상세 조회
  getQnaDetail = async (id: number): Promise<GetQnaDetailModel> => {
    const { data } = await this.axios({
      method: "GET",
      url: `/api/admin/qna/${id}`,
    });

    return data;
  };

  // QnA 등록
  createQna = async (req: CreateQnaDto): Promise<CreateQnaModel> => {
    const { data } = await this.axios({
      method: "POST",
      url: "/api/admin/qna",
      data: req,
    });

    return data;
  };

  // QnA 수정
  editQna = async (req: EditQnaDto): Promise<EditQnaModel> => {
    const { id, ...data } = req;
    const { data: response } = await this.axios({
      method: "PUT",
      url: `/api/admin/qna/${id}`,
      data,
    });

    return response;
  };

  // QnA 삭제
  deleteQna = async (id: number): Promise<DeleteQnaModel> => {
    const { data } = await this.axios({
      method: "DELETE",
      url: `/api/admin/qna/${id}`,
    });

    return data;
  };
}

const qnaApi = new QnaApi();

export default qnaApi;
