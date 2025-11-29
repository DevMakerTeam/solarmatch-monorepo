import instance from "@/utils/instance";
import { AxiosInstance } from "axios";
import { GetUsersDto } from "./types/dto/get-users-dto";
import { GetUsersModel } from "./types/model/get-users-model";
import { GetUserDetailModel } from "./types/model/get-user-detail-model";
import { EditUserDto } from "./types/dto/edit-user-dto";
import { EditUserModel } from "./types/model/edit-user-model";
import { DeleteUserModel } from "./types/model/delete-user-model";
import { UsersExcelDownloadDto } from "./types/dto/users-excel-download-dto";
import { UsersExcelDownloadModel } from "./types/model/users-excel-download-model";
import { UsersStatsTodayRegistrationsModel } from "./types/model/users-stats-today-registrations-model";
import { GetUserDetailDto } from "./types/dto/get-user-detail-dto";
import { UsersStatsBidsDto } from "./types/dto/users-stats-bids-dto";
import { UsersStatsBidsModel } from "./types/model/users-stats-bids-model";

class UsersApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  // 회원 목록 조회
  getUsers = async (params: GetUsersDto): Promise<GetUsersModel> => {
    const { data } = await this.axios({
      method: "GET",
      url: "/api/admin/users",
      params,
    });

    return data;
  };

  // 회원 상세 조회
  getUserDetail = async ({
    id,
    ...params
  }: GetUserDetailDto): Promise<GetUserDetailModel> => {
    const { data } = await this.axios({
      method: "GET",
      url: `/api/admin/users/${id}`,
      params,
    });

    return data;
  };

  // 회원 정보 수정
  editUser = async (req: EditUserDto): Promise<EditUserModel> => {
    const { id, ...data } = req;
    const { data: response } = await this.axios({
      method: "PUT",
      url: `/api/admin/users/${id}`,
      data,
    });

    return response;
  };

  // 회원 탈퇴 처리
  deleteUser = async (id: number): Promise<DeleteUserModel> => {
    const { data } = await this.axios({
      method: "DELETE",
      url: `/api/admin/users/${id}`,
    });

    return data;
  };

  // 회원 목록 엑셀 다운로드
  usersExcelDownload = async (
    params: UsersExcelDownloadDto
  ): Promise<UsersExcelDownloadModel> => {
    const response = await this.axios({
      method: "GET",
      url: "/api/admin/users/excel",
      params,
      responseType: "blob",
    });

    const timestamp = response.headers["date"] || new Date().toISOString();

    return {
      blob: response.data,
      timestamp,
    };
  };

  // 오늘 가입 고객 통계 조회
  usersStatsTodayRegistrations =
    async (): Promise<UsersStatsTodayRegistrationsModel> => {
      const { data } = await this.axios({
        method: "GET",
        url: "/api/admin/users/stats/today-registrations",
      });

      return data;
    };

  // 입찰 건수 통계 조회
  usersStatsBids = async (
    params: UsersStatsBidsDto
  ): Promise<UsersStatsBidsModel> => {
    const { data } = await this.axios({
      method: "GET",
      url: "/api/admin/users/stats/bids",
      params,
    });

    return data;
  };
}

const usersApi = new UsersApi();

export default usersApi;
