import { UseMutationParams } from "@repo/types";
import partnerApi from "./PartnerApi";
import { useMutation } from "@tanstack/react-query";

// 파트너 신청
export const useApplyMutation = (
  params?: UseMutationParams<typeof partnerApi.apply>
) => {
  return useMutation({
    mutationFn: partnerApi.apply,
    ...params?.options,
  });
};
