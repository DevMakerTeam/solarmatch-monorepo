import { useGetContractsQuery } from "@/api/contract/ContractApi.query";
import { usePageUrl } from "@repo/hooks";

const PAGE_SIZE = 9;

export const useContracts = () => {
  const { currentPage, handlePageChange } = usePageUrl();

  // 계약 목록 조회 (관리자)
  const { data } = useGetContractsQuery({
    options: {
      enabled: !!currentPage,
    },
    variables: {
      page: currentPage,
      size: PAGE_SIZE,
    },
  });
  const { data: contractsPagination } = data || {};
  const { data: contractsList, totalPages } = contractsPagination || {};

  return {
    contractsList,
    totalPages,
    currentPage,
    handlePageChange,
  };
};
