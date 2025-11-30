import { useGetContractCaseDetailQuery } from "@/api/contract/ContractApi.query";
import { useRouter } from "next/router";

export const useCasesDetail = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  // 시공사례 상세 조회
  const { data, isLoading } = useGetContractCaseDetailQuery({
    variables: Number(id),
    options: {
      enabled: !!id,
    },
  });

  const { data: contractCaseDetail } = data || {};

  return {
    contractCaseDetail,
    isLoading,
  };
};
