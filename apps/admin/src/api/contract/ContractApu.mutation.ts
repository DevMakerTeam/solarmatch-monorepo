import { UseMutationParams } from "@repo/types";
import contractApi from "./ContractApi";
import { useMutation } from "@tanstack/react-query";

// 계약 수정 (관리자)
export const useEditContractMutation = (
  params?: UseMutationParams<typeof contractApi.editContract>
) => {
  return useMutation({
    mutationFn: contractApi.editContract,
    ...params?.options,
  });
};
