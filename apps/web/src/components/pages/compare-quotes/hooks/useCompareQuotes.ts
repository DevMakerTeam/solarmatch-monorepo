import { useRouter } from "next/router";
import { useCompareQuotesForm } from "./useCompareQuotesForm";
import {
  isNotNullish,
  SOLAR_INSTALLATION_TYPES,
  SOLAR_STRUCTURE_TYPES,
  type SolarInstallationType,
  type SolarStructureType,
} from "@repo/types";
import { useImageUploadMutation } from "@/api/image/ImageApi.mutation";
import { useImageFilePicker } from "@repo/hooks";
import { usePostQuoteMutation } from "@/api/quote/QuoteApi.mutation";
import { useRef } from "react";

export const useCompareQuotes = () => {
  const router = useRouter();
  const { structureType, installationType, plannedCapacity } = router.query;
  const formMethods = useCompareQuotesForm({
    defaultValues: {
      installationType: isNotNullish(installationType)
        ? (installationType as string)
        : SOLAR_INSTALLATION_TYPES.ROOF,
      structureType: isNotNullish(structureType)
        ? (structureType as string)
        : (SOLAR_STRUCTURE_TYPES.RESIDENTIAL_SOLAR as string),
      baseAddress: "",
      detailAddress: "",
      currentCapacity: undefined,
      plannedCapacity: isNotNullish(plannedCapacity)
        ? Number(plannedCapacity)
        : undefined,
      monthlyAverageUsage: undefined,
    },
  });

  const pendingFilesRef = useRef<Array<{ fileName: string; fileSize: number }>>(
    []
  );
  const {
    setValue,
    getValues,
    formState: { isValid },
  } = formMethods;

  const { mutate: imageUploadMutation, isPending: isUploading } =
    useImageUploadMutation({
      options: {
        onSuccess: data => {
          const uploadedImages = data?.data || [];
          const currentImages = getValues("imageIds") || [];
          const pendingFiles = pendingFilesRef.current;

          // 업로드된 이미지와 파일 정보를 매칭 (순서대로)
          const imagesWithFileInfo = uploadedImages.map((image, index) => ({
            ...image,
            fileName: pendingFiles[index]?.fileName || "",
            fileSize: pendingFiles[index]?.fileSize || 0,
          }));

          setValue("imageIds", [...currentImages, ...imagesWithFileInfo]);
          // 파일 정보 초기화
          pendingFilesRef.current = [];
        },
      },
    });

  const { fileInputRef, openFilePicker, handleFileChange, accept, multiple } =
    useImageFilePicker({
      onValidFiles: files => {
        // 파일 정보를 저장 (업로드 후 매칭하기 위해)
        const fileInfos = files.map(file => ({
          fileName: file.name,
          fileSize: file.size,
        }));
        pendingFilesRef.current = fileInfos;

        imageUploadMutation({
          files,
          type: "QUOTE",
        });
      },
    });

  const deleteImage = (imageId: number) => {
    const currentImages = getValues("imageIds") || [];
    const filteredImages = currentImages.filter(image => image.id !== imageId);
    setValue("imageIds", filteredImages);
  };

  const { mutate: postQuoteMutation, isPending: isPostQuotePending } =
    usePostQuoteMutation({
      options: {
        onSuccess: () => {
          router.push("/bidding/residential-solar");
          // TODO invalidateQueries, 내데이터만 보기로 링크 이동 되어야함
        },
      },
    });
  const handleSubmit = formMethods.handleSubmit(data => {
    postQuoteMutation({
      ...data,
      installationType: data.installationType as SolarInstallationType,
      structureType: data.structureType as SolarStructureType,
      otherRequests: data.otherRequests || "",
      imageIds: data.imageIds?.map(image => image.id) || [],
    });
  });

  return {
    formMethods,
    handleSubmit,
    fileInputRef,
    openFilePicker,
    handleFileChange,
    deleteImage,
    isUploading,
    isPostQuotePending,
    isValid,
    accept,
    multiple,
  };
};
