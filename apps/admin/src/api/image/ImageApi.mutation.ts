import { isNotNullish, Parameter, UseMutationParams } from "@repo/types";
import imageApi from "./ImageApi";
import { useMutation } from "@tanstack/react-query";

export const IMAGE_API_MUTATION_KEY = {
  PARTNER_LOGO: (params?: Parameter<typeof imageApi.partnerLogo>) =>
    ["partner-logo", params].filter(isNotNullish),
  IMAGE_UPLOAD: (params?: Parameter<typeof imageApi.imageUpload>) =>
    ["image-upload", params].filter(isNotNullish),
};

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
