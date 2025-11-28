import { useGetContractDetailQuery } from "@/api/contract/ContractApi.query";
import { useRouter } from "next/router";
import { useContractDetailForm } from "./useContractDetailForm";

export const useContractDetail = () => {
  const router = useRouter();
  const { id: contractId } = router.query;

  // 계약 상세 조회 (관리자)
  const { data: contractDetailData } = useGetContractDetailQuery({
    variables: Number(contractId),
    options: {
      enabled: !!contractId,
    },
  });
  const { data: contractDetail } = contractDetailData || {};

  // 계약 상세 폼
  const formMethods = useContractDetailForm({
    defaultValues: {
      solarModule: contractDetail?.bidInfo?.solarModule || "",
      solarModuleOrigin: contractDetail?.bidInfo?.solarModuleOrigin || "국내산",
      inverter: contractDetail?.bidInfo?.inverter || "",
      inverterOrigin: contractDetail?.bidInfo?.inverterOrigin || "국내산",
      structure: contractDetail?.bidInfo?.structure || "",
      installationReview: contractDetail?.installationReview || "",
      addPhotoImageIds: undefined,
      deletePhotoIds: undefined,
    },
  });
  const handleSubmit = formMethods.handleSubmit(data => {
    console.log(data);
  });

  return {
    contractDetail,
    formMethods,
    handleSubmit,
  };
};
