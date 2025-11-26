import { isNotNullish, Parameter, UseQueryParams } from "@repo/types";
import quoteApi from "./QuoteApi";
import { useQuery } from "@tanstack/react-query";

export const QUOTE_API_QUERY_KEY = {
  GET_QUOTES: (params?: Parameter<typeof quoteApi.getQuotes>) =>
    ["get-quotes", params].filter(isNotNullish),
};

// 견적 목록 조회 (관리자)
export const useGetQuotesQuery = (
  params?: UseQueryParams<typeof quoteApi.getQuotes>
) => {
  const queryKey = QUOTE_API_QUERY_KEY.GET_QUOTES(params?.variables);
  return useQuery({
    queryKey,
    queryFn: () => quoteApi.getQuotes(params?.variables),
    ...params?.options,
  });
};
