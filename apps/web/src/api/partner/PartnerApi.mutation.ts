import { isNotNullish, Parameter, UseMutationParams } from "@repo/types";
import partnerApi from "./PartnerApi";
import { useMutation } from "@tanstack/react-query";

export const PARTNER_API_MUTATION_KEY = {
  APPLY: (params?: Parameter<typeof partnerApi.apply>) =>
    ["partner-apply", params].filter(isNotNullish),
};

// 파트너 신청
export const useApplyMutation = (
  params?: UseMutationParams<typeof partnerApi.apply>
) => {
  return useMutation({
    mutationFn: partnerApi.apply,
    ...params?.options,
  });
};
