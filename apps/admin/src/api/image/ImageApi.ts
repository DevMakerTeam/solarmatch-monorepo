import instance from "@/utils/instance";
import { AxiosInstance } from "axios";
import { PartnerLogoDto } from "./types/dto/partner-logo-dto";
import { PartnerLogoModel } from "./types/model/partner-logo-model";
import { GetImageUrlDto } from "./types/dto/get-image-url-dto";
import { GetImageUrlModel } from "./types/model/get-image-url-model";

class ImageApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  // 파트너 로고 이미지 업로드
  partnerLogo = async (req: PartnerLogoDto): Promise<PartnerLogoModel> => {
    const formData = new FormData();
    formData.append("file", req.file, req.file.name);

    const { data } = await this.axios({
      method: "POST",
      url: "/api/image/partner/logo",
      data: formData,
    });

    return data;
  };

  // 이미지 URL 조회
  getImageUrl = async (params: GetImageUrlDto): Promise<GetImageUrlModel> => {
    const { data } = await this.axios({
      method: "GET",
      url: `/api/image/${params.imageId}`,
    });

    return data;
  };
}

const imageApi = new ImageApi();

export default imageApi;
