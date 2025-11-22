import { isNotNullish, PartnerRegion } from "@repo/types";
import { useApplyPartnerForm } from "./useApplyPartnerForm";
import {
  useGetImageUrlQuery,
  IMAGE_API_QUERY_KEY,
} from "@/api/image/ImageApi.query";
import { usePartnerLogoMutation } from "@/api/image/ImageApi.mutation";
import { useQueryClient } from "@tanstack/react-query";
import { useApplyMutation } from "@/api/partner/PartnerApi.mutation";
import { useRouter } from "next/router";

export const useApplyPartner = () => {
  const router = useRouter();

  const formMethods = useApplyPartnerForm();
  const queryClient = useQueryClient();
  const {
    register,
    formState: { errors, isValid },
    watch,
    control,
    setValue,
    getValues,
  } = formMethods;

  const logoImageId = watch("logoImageId");

  const { data } = useGetImageUrlQuery({
    variables: {
      imageId: Number(logoImageId),
    },
    options: {
      enabled: isNotNullish(logoImageId),
    },
  });
  const { data: getImageUrlResponse } = data || {};
  const { url } = getImageUrlResponse || {};

  const { mutate: partnerLogoMutation } = usePartnerLogoMutation({
    options: {
      onSuccess: data => {
        const { data: logoImageId } = data || {};
        setValue("logoImageId", logoImageId);
      },
    },
  });

  const uploadLogoImage = (file: File) => {
    partnerLogoMutation({
      file,
    });
  };

  const deleteLogoImage = () => {
    const prevLogoImageId = getValues("logoImageId");

    setValue("logoImageId", undefined);

    if (isNotNullish(prevLogoImageId)) {
      // 해당 이미지 URL 캐시를 즉시 비우기 위해 setQueryData로 undefined 설정
      const key = IMAGE_API_QUERY_KEY.GET_IMAGE_URL({
        imageId: Number(prevLogoImageId),
      });
      queryClient.setQueryData(key, undefined);
    }
  };

  const toggleServiceAreaValue = (
    current: PartnerRegion[] = [],
    region: PartnerRegion
  ): PartnerRegion[] => {
    if (current.includes(region)) {
      return current.filter(r => r !== region);
    }
    if (current.length < 3) {
      return [...current, region];
    }
    return current;
  };

  const { mutate: applyMutation, isPending: isApplyPending } = useApplyMutation(
    {
      options: {
        onSuccess: () => {
          router.replace("/");
        },
      },
    }
  );
  const handleSubmit = formMethods.handleSubmit(data => {
    applyMutation(data);
  });

  return {
    formMethods,
    register,
    handleSubmit,
    errors,
    isValid,
    control,
    toggleServiceAreaValue,
    uploadLogoImage,
    deleteLogoImage,
    url,
    logoImageId,
    isApplyPending,
  };
};
