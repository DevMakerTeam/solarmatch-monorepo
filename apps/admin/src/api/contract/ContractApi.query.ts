import { isNotNullish, Parameter, UseQueryParams } from "@repo/types";
import contractApi from "./ContractApi";
import { useQuery } from "@tanstack/react-query";

export const CONTRACT_API_QUERY_KEY = {
  GET_CONTRACTS: (params?: Parameter<typeof contractApi.getContracts>) =>
    ["get-contracts", params].filter(isNotNullish),
  GET_CONTRACT_DETAIL: (
    params?: Parameter<typeof contractApi.getContractDetail>
  ) => ["get-contract-detail", params].filter(isNotNullish),
};

// 계약 목록 조회 (관리자)
export const useGetContractsQuery = (
  params?: UseQueryParams<typeof contractApi.getContracts>
) => {
  return useQuery({
    queryKey: CONTRACT_API_QUERY_KEY.GET_CONTRACTS(params?.variables),
    queryFn: () => contractApi.getContracts(params?.variables),
    ...params?.options,
  });
};

// 계약 상세 조회 (관리자)
export const useGetContractDetailQuery = (
  params: UseQueryParams<typeof contractApi.getContractDetail>
) => {
  return useQuery({
    queryKey: CONTRACT_API_QUERY_KEY.GET_CONTRACT_DETAIL(params.variables),
    queryFn: () => contractApi.getContractDetail(params.variables),
    ...params?.options,
  });
};
