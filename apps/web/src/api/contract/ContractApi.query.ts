import { isNotNullish, Parameter, UseQueryParams } from "@repo/types";
import contractApi from "./ContractApi";
import { useQuery } from "@tanstack/react-query";

export const CONTRACT_API_QUERY_KEY = {
  GET_CONTRACT_CASES: (
    params?: Parameter<typeof contractApi.getContractCases>
  ) => ["get-contract-cases", params].filter(isNotNullish),
  GET_CONTRACT_CASE_DETAIL: (
    params?: Parameter<typeof contractApi.getContractCaseDetail>
  ) => ["get-contract-case-detail", params].filter(isNotNullish),
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

// 시공사례 상세 조회
export const useGetContractCaseDetailQuery = (
  params: UseQueryParams<typeof contractApi.getContractCaseDetail>
) => {
  return useQuery({
    queryKey: CONTRACT_API_QUERY_KEY.GET_CONTRACT_CASE_DETAIL(params.variables),
    queryFn: () => contractApi.getContractCaseDetail(params.variables),
    ...params?.options,
  });
};
