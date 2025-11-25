import { isNotNullish, Parameter, UseQueryParams } from "@repo/types";
import bidApi from "./BidApi";
import { useQuery } from "@tanstack/react-query";

export const BID_API_QUERY_KEY = {
  GET_BID_DETAIL: (params?: Parameter<typeof bidApi.getBidDetail>) =>
    ["get-bid-detail", params].filter(isNotNullish),
};

// 입찰 상세 조회 (사용자)
export const useGetBidDetailQuery = (
  params: UseQueryParams<typeof bidApi.getBidDetail>
) => {
  const queryKey = BID_API_QUERY_KEY.GET_BID_DETAIL(params?.variables);
  return useQuery({
    queryKey,
    queryFn: () => bidApi.getBidDetail(params.variables),
    ...params?.options,
  });
};
