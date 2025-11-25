import { isNotNullish, Parameter, UseQueryParams } from "@repo/types";
import quoteApi from "./QuoteApi";
import { useQuery } from "@tanstack/react-query";

export const QUOTE_API_QUERY_KEY = {
  GET_QUOTES: (params?: Parameter<typeof quoteApi.getQuotes>) =>
    ["get-quotes", params].filter(isNotNullish),
  GET_QUOTE_DETAIL: (params?: Parameter<typeof quoteApi.getQuoteDetail>) =>
    ["get-quote-detail", params].filter(isNotNullish),
};

// 견적 목록 조회
export const useGetQuotesQuery = (
  params: UseQueryParams<typeof quoteApi.getQuotes>
) => {
  const queryKey = QUOTE_API_QUERY_KEY.GET_QUOTES(params?.variables);
  return useQuery({
    queryKey,
    queryFn: () => quoteApi.getQuotes(params?.variables),
    ...params?.options,
  });
};

// 견적 상세 조회
export const useGetQuoteDetailQuery = (
  params: UseQueryParams<typeof quoteApi.getQuoteDetail>
) => {
  const queryKey = QUOTE_API_QUERY_KEY.GET_QUOTE_DETAIL(params?.variables);
  return useQuery({
    queryKey,
    queryFn: () => quoteApi.getQuoteDetail(params?.variables),
    ...params?.options,
  });
};
