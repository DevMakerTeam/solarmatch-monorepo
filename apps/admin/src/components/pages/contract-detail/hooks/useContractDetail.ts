import {
  CONTRACT_API_QUERY_KEY,
  useGetContractDetailQuery,
} from "@/api/contract/ContractApi.query";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useContractDetailForm } from "./useContractDetailForm";
import { useImageUploadMutation } from "@/api/image/ImageApi.mutation";
import { useImageFilePicker } from "@repo/hooks";
import { EditContractDto } from "@/api/contract/types/dto/edit-contract-dto";
import { useEditContractMutation } from "@/api/contract/ContractApu.mutation";
import { useQueryClient } from "@tanstack/react-query";

export const useContractDetail = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id: contractIdSlot } = router.query as { id: string };
  const contractId = Number(contractIdSlot);

  const goToList = () => {
    router.back();
  };

  // 계약 상세 조회 (관리자)
  const { data: contractDetailData, isLoading: isContractDetailLoading } =
    useGetContractDetailQuery({
      variables: Number(contractIdSlot),
      options: {
        enabled: !!contractId,
      },
    });
  const { data: contractDetail } = contractDetailData || {};

  // 계약 상세 폼
  const formMethods = useContractDetailForm({
    defaultValues: {
      solarModule: "",
      solarModuleOrigin: "국내산",
      inverter: "",
      inverterOrigin: "국내산",
      structure: "",
      installationReview: "",
      addPhotoImageIds: undefined,
      deletePhotoIds: undefined,
      uploadedPhotos: undefined,
    },
  });

  // contractDetail이 로드되면 폼 초기화
  useEffect(() => {
    if (contractDetail) {
      formMethods.reset({
        solarModule: contractDetail.bidInfo?.solarModule || "",
        solarModuleOrigin:
          contractDetail.bidInfo?.solarModuleOrigin || "국내산",
        inverter: contractDetail.bidInfo?.inverter || "",
        inverterOrigin: contractDetail.bidInfo?.inverterOrigin || "국내산",
        structure: contractDetail.bidInfo?.structure || "",
        installationReview: contractDetail.installationReview || "",
        addPhotoImageIds: undefined,
        deletePhotoIds: undefined,
        uploadedPhotos: undefined,
      });
    }
  }, [contractDetail, formMethods]);

  const {
    setValue,
    getValues,
    watch,
    formState: { isDirty },
  } = formMethods;

  // 이미지 관련 필드들의 변경 감지
  const addPhotoImageIds = watch("addPhotoImageIds");
  const deletePhotoIds = watch("deletePhotoIds");
  const uploadedPhotos = watch("uploadedPhotos");

  // 이미지 변경 여부 확인 (추가/삭제/업로드된 이미지가 있으면 dirty)
  const hasImageChanges = Boolean(
    (addPhotoImageIds && addPhotoImageIds.length > 0) ||
      (deletePhotoIds && deletePhotoIds.length > 0) ||
      (uploadedPhotos && uploadedPhotos.length > 0)
  );

  // 최종 dirty 상태 (디폴트값에서 변경된 경우만)
  const isFormDirty = isDirty || hasImageChanges;

  const { mutate: editContractMutation, isPending: isEditing } =
    useEditContractMutation({
      options: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: CONTRACT_API_QUERY_KEY.GET_CONTRACT_DETAIL(
              Number(contractIdSlot)
            ),
          });
        },
      },
    });

  const handleSubmit = formMethods.handleSubmit(data => {
    const submitData: EditContractDto = {
      contractId: Number(contractIdSlot),
      solarModule: data.solarModule,
      solarModuleOrigin: data.solarModuleOrigin,
      inverter: data.inverter,
      inverterOrigin: data.inverterOrigin,
      structure: data.structure || "",
      installationReview: data.installationReview,
    };

    // addPhotoImageIds가 비어있거나 없으면 null로 처리
    const filteredAddIds =
      data.addPhotoImageIds?.filter((id): id is number => id !== undefined) ||
      [];
    if (filteredAddIds.length === 0) {
      submitData.addPhotoImageIds = null;
    } else {
      submitData.addPhotoImageIds = filteredAddIds;
    }

    // deletePhotoIds가 비어있거나 없으면 null로 처리
    const filteredDeleteIds =
      data.deletePhotoIds?.filter((id): id is number => id !== undefined) || [];
    if (filteredDeleteIds.length === 0) {
      submitData.deletePhotoIds = null;
    } else {
      submitData.deletePhotoIds = filteredDeleteIds;
    }

    editContractMutation(submitData, {
      onSuccess: () => {
        // 폼을 최신 데이터로 리셋
        formMethods.reset({
          solarModule: contractDetail?.bidInfo?.solarModule || "",
          solarModuleOrigin:
            contractDetail?.bidInfo?.solarModuleOrigin || "국내산",
          inverter: contractDetail?.bidInfo?.inverter || "",
          inverterOrigin: contractDetail?.bidInfo?.inverterOrigin || "국내산",
          structure: contractDetail?.bidInfo?.structure || "",
          installationReview: contractDetail?.installationReview || "",
          addPhotoImageIds: undefined,
          deletePhotoIds: undefined,
          uploadedPhotos: undefined,
        });
      },
    });
  });

  // 일반 이미지 업로드 (다중)
  const { mutate: imageUploadMutation, isPending: isUploading } =
    useImageUploadMutation({
      options: {
        onSuccess: data => {
          const uploadedImages = data?.data || [];
          const currentImageIds = getValues("addPhotoImageIds") || [];
          const currentUploadedPhotos = getValues("uploadedPhotos") || [];

          // 업로드된 이미지 ID들을 기존 목록에 추가
          const newImageIds = uploadedImages.map(image => image.id);
          setValue("addPhotoImageIds", [...currentImageIds, ...newImageIds]);

          // 업로드된 이미지 정보(id, url)를 저장 (미리보기용)
          setValue("uploadedPhotos", [
            ...currentUploadedPhotos,
            ...uploadedImages,
          ]);
        },
      },
    });

  const { fileInputRef, openFilePicker, handleFileChange, accept, multiple } =
    useImageFilePicker({
      onValidFiles: files => {
        imageUploadMutation({
          files,
          type: "OTHER",
        });
      },
    });

  const addConstructionPhoto = isUploading ? undefined : openFilePicker;

  // 기존 이미지 삭제
  const deleteExistingPhoto = (imageId: number) => {
    const currentDeleteIds = getValues("deletePhotoIds") || [];
    if (!currentDeleteIds.includes(imageId)) {
      setValue("deletePhotoIds", [...currentDeleteIds, imageId]);
    }
  };

  // 새로 업로드한 이미지 삭제
  const deleteUploadedPhoto = (imageId: number) => {
    const currentUploadedPhotos = getValues("uploadedPhotos") || [];
    const currentImageIds = getValues("addPhotoImageIds") || [];

    // uploadedPhotos에서 제거
    const filteredPhotos = currentUploadedPhotos.filter(
      photo => photo.id !== imageId
    );
    setValue("uploadedPhotos", filteredPhotos);

    // addPhotoImageIds에서도 제거
    const filteredImageIds = currentImageIds.filter(id => id !== imageId);
    setValue("addPhotoImageIds", filteredImageIds);
  };

  return {
    contractDetail,
    formMethods,
    handleSubmit,
    goToList,
    addConstructionPhoto,
    fileInputRef,
    handleFileChange,
    accept,
    multiple,
    isUploading,
    deleteExistingPhoto,
    deleteUploadedPhoto,
    isDirty: isFormDirty,
    isEditing,
    isContractDetailLoading,
  };
};
