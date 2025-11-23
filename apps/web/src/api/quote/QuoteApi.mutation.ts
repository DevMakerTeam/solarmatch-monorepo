import { UseMutationParams } from "@repo/types";
import quoteApi from "./QuoteApi";
import { useMutation } from "@tanstack/react-query";

// 견적 요청
export const usePostQuoteMutation = (
  params?: UseMutationParams<typeof quoteApi.postQuote>
) => {
  return useMutation({
    mutationFn: quoteApi.postQuote,
    ...params?.options,
  });
};
