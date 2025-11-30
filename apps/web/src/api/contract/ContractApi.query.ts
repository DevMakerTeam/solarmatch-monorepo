import { isNotNullish, Parameter, UseQueryParams } from "@repo/types";
import contractApi from "./ContractApi";
import { useQuery } from "@tanstack/react-query";

export const CONTRACT_API_QUERY_KEY = {
  GET_CONTRACT_CASES: (
    params?: Parameter<typeof contractApi.getContractCases>
  ) => ["get-contract-cases", params].filter(isNotNullish),
};

// 시공사례 목록 조회
export const useGetContractCasesQuery = (
  params?: UseQueryParams<typeof contractApi.getContractCases>
) => {
  return useQuery({
    queryKey: CONTRACT_API_QUERY_KEY.GET_CONTRACT_CASES(params?.variables),
    queryFn: () => contractApi.getContractCases(params?.variables),
    ...params?.options,
  });
};
