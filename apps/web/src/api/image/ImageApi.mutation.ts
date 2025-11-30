import { UseMutationParams } from "@repo/types";
import imageApi from "./ImageApi";
import { useMutation } from "@tanstack/react-query";

// 파트너 로고 이미지 업로드
export const usePartnerLogoMutation = (
  params?: UseMutationParams<typeof imageApi.partnerLogo>
) => {
  return useMutation({
    mutationFn: imageApi.partnerLogo,
    ...params?.options,
  });
};

// 일반 이미지 업로드 (다중)
export const useImageUploadMutation = (
  params?: UseMutationParams<typeof imageApi.imageUpload>
) => {
  return useMutation({
    mutationFn: imageApi.imageUpload,
    ...params?.options,
  });
};
