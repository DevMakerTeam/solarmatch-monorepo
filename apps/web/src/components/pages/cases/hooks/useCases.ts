import { useGetContractCasesQuery } from "@/api/contract/ContractApi.query";
import { usePageUrl } from "@repo/hooks";

const PAGE_SIZE = 6;

export const useCases = () => {
  const { currentPage, handlePageChange } = usePageUrl();

  const { data, isLoading } = useGetContractCasesQuery({
    variables: {
      page: currentPage,
      pageSize: PAGE_SIZE,
    },
    options: {
      enabled: !!currentPage,
    },
  });

  const { data: contractCasesData } = data || {};
  const { data: contractCasesList = [] } = contractCasesData || {};
  const totalCount = contractCasesData?.total ?? 0;
  const totalPages = contractCasesData?.totalPages ?? 1;

  return {
    contractCasesList,
    totalCount,
    totalPages,
    currentPage,
    handlePageChange,
    isLoading,
  };
};
