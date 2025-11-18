import { isNotNullish, Parameter, UseMutationParams } from "@repo/types";
import imageApi from "./ImageApi";
import { useMutation } from "@tanstack/react-query";

export const IMAGE_API_MUTATION_KEY = {
  PARTNER_LOGO: (params?: Parameter<typeof imageApi.partnerLogo>) =>
    ["partner-logo", params].filter(isNotNullish),
};

export const usePartnerLogoMutation = (
  params?: UseMutationParams<typeof imageApi.partnerLogo>
) => {
  return useMutation({
    mutationFn: imageApi.partnerLogo,
    ...params?.options,
  });
};
