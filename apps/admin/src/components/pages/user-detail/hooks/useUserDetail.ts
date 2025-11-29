import {
  useDeleteUserMutation,
  useEditUserMutation,
} from "@/api/users/UsersApi.mutation";
import {
  useGetUserDetailQuery,
  USERS_API_QUERY_KEY,
} from "@/api/users/UsersApi.query";
import { useModals, usePageUrl } from "@repo/hooks";
import { isNotNullish } from "@repo/types";
import { ConfirmModal } from "@repo/ui/modal";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUserDetailForm } from "./useUserDetailForm";
import { usePartnerLogoMutation } from "@/api/image/ImageApi.mutation";
import {
  useGetImageUrlQuery,
  IMAGE_API_QUERY_KEY,
} from "@/api/image/ImageApi.query";
import { DEFAULT_LOGO_URL } from "@repo/constants";

const PAGE_SIZE = 5;

export const useUserDetail = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const idSlot = router.query.id;

  const { currentPage, handlePageChange } = usePageUrl();

  // 회원 상세 조회
  const {
    data,
    isLoading: isUserDetailLoading,
    isFetching: isUserDetailFetching,
  } = useGetUserDetailQuery({
    variables: {
      id: Number(idSlot),
      casePage: currentPage,
      caseSize: PAGE_SIZE,
    },
    options: {
      enabled: !!idSlot || !!currentPage,
    },
  });
  const { data: userDetail } = data || {};
  const { contractCases } = (userDetail || {}).partnerInfo || {};
  const {
    totalPages,
    data: casesList,
    total: casesTotal,
  } = contractCases || {};

  // logoImageId 초기값: 기존 이미지가 기본 이미지면 -1, 아니면 undefined
  const initialLogoImageId =
    userDetail?.partnerInfo?.logoUrl === DEFAULT_LOGO_URL ? -1 : undefined;

  const formMethods = useUserDetailForm({
    defaultValues: {
      companyIntroduction: userDetail?.partnerInfo?.companyIntroduction || "",
      companyName: userDetail?.partnerInfo?.companyName || "",
      partnerStatus: userDetail?.partnerInfo?.status,
      logoImageId: initialLogoImageId,
    },
  });
  const { control, setValue, watch, getValues, reset, formState } = formMethods;
  const { isValid, isDirty } = formState;

  // userDetail이 업데이트되면 form을 리셋
  useEffect(() => {
    if (userDetail?.partnerInfo) {
      const currentLogoImageId = getValues("logoImageId");
      const newInitialLogoImageId =
        userDetail.partnerInfo.logoUrl === DEFAULT_LOGO_URL ? -1 : undefined;
      reset({
        companyIntroduction: userDetail.partnerInfo.companyIntroduction || "",
        companyName: userDetail.partnerInfo.companyName || "",
        partnerStatus: userDetail.partnerInfo.status,
        logoImageId: currentLogoImageId ?? newInitialLogoImageId,
      });
    }
  }, [userDetail?.partnerInfo, reset, getValues]);

  const isPartner = !!userDetail?.partnerInfo;

  // 회원 탈퇴 처리
  const { open: openDeleteUserModal, close: closeDeleteUserModal } =
    useModals();
  const { mutate: deleteUser, isPending: isDeleteUserPending } =
    useDeleteUserMutation({
      options: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: USERS_API_QUERY_KEY.GET_USER_DETAIL(),
          });
          queryClient.invalidateQueries({
            queryKey: USERS_API_QUERY_KEY.GET_USER_DETAIL({
              id: Number(idSlot),
              casePage: currentPage,
              caseSize: PAGE_SIZE,
            }),
          });
        },
      },
    });
  const handleDeleteUser = (id?: number) => {
    if (!isNotNullish(id)) return;

    openDeleteUserModal(ConfirmModal, {
      onConfirm: () => deleteUser(id),
      onClose: closeDeleteUserModal,
      text: "정말 탈퇴 처리 하시겠습니까?",
      isLoading: isDeleteUserPending,
    });
  };

  const logoImageId = watch("logoImageId");
  const { data: getImageUrlResponseData } = useGetImageUrlQuery({
    variables: {
      imageId: Number(logoImageId),
    },
    options: {
      // -1이 아닌 경우에만 쿼리 실행
      enabled: isNotNullish(logoImageId) && logoImageId !== -1,
    },
  });
  const { data: getImageUrlResponse } = getImageUrlResponseData || {};
  const { url } = getImageUrlResponse || {};

  const { mutate: partnerLogoMutation } = usePartnerLogoMutation({
    options: {
      onSuccess: data => {
        const { data: logoImageId } = data || {};
        setValue("logoImageId", logoImageId, { shouldDirty: true });
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

    // 기본 이미지 선택 시 logoImageId를 -1로 설정
    // react-hook-form이 자동으로 초기값과 비교해서 isDirty 계산
    setValue("logoImageId", -1, { shouldDirty: true });

    if (isNotNullish(prevLogoImageId) && prevLogoImageId !== -1) {
      const key = IMAGE_API_QUERY_KEY.GET_IMAGE_URL({
        imageId: Number(prevLogoImageId),
      });
      queryClient.setQueryData(key, undefined);
    }
  };

  const { mutate } = useEditUserMutation({
    options: {
      onSuccess: (_, variables) => {
        // 회원 상세 정보 쿼리 무효화
        queryClient.invalidateQueries({
          queryKey: USERS_API_QUERY_KEY.GET_USER_DETAIL(),
        });
        queryClient.invalidateQueries({
          queryKey: USERS_API_QUERY_KEY.GET_USER_DETAIL({
            id: Number(idSlot),
            casePage: currentPage,
            caseSize: PAGE_SIZE,
          }),
        });

        // imageId 값이 있을 때만 이미지 URL 쿼리 무효화
        if (isNotNullish(variables.logoImageId)) {
          queryClient.invalidateQueries({
            queryKey: IMAGE_API_QUERY_KEY.GET_IMAGE_URL({
              imageId: Number(variables.logoImageId),
            }),
          });
        }
      },
    },
  });
  const handleSubmit = formMethods.handleSubmit(data => {
    const submitData = { ...data };

    if (!formState.dirtyFields.logoImageId) {
      delete submitData.logoImageId;
    }

    mutate({
      id: Number(idSlot),
      ...submitData,
    });
  });

  const goToList = () => {
    router.back();
  };

  return {
    userDetail,
    isPartner,
    handleDeleteUser,
    goToList,
    control,
    formMethods,
    uploadLogoImage,
    deleteLogoImage,
    url,
    logoImageId,
    handleSubmit,
    isValid: isValid && isDirty, // 변경사항이 있고 유효할 때만 저장 가능
    totalPages,
    currentPage,
    handlePageChange,
    casesList,
    isUserDetailLoading,
    isUserDetailFetching,
    casesTotal,
  };
};
