import { UseMutationParams } from "@repo/types";
import quoteApi from "./QuoteApi";
import { useMutation } from "@tanstack/react-query";

// 견적 수정 (관리자)
export const useEditQuoteMutation = (
  params?: UseMutationParams<typeof quoteApi.editQuote>
) => {
  return useMutation({
    mutationFn: quoteApi.editQuote,
    ...params?.options,
  });
};
