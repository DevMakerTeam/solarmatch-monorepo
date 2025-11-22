import { useDeleteUserMutation } from "@/api/users/UsersApi.mutation";
import {
  useGetUserDetailQuery,
  USERS_API_QUERY_KEY,
} from "@/api/users/UsersApi.query";
import { useModals } from "@repo/hooks";
import { isNotNullish } from "@repo/types";
import { ConfirmModal } from "@repo/ui/modal";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

export const useUserDetail = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const idSlot = router.query.id;

  // 회원 상세 조회
  const { data } = useGetUserDetailQuery({
    variables: Number(idSlot),
    options: {
      enabled: !!idSlot,
    },
  });
  const { data: userDetail } = data || {};

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
            queryKey: USERS_API_QUERY_KEY.GET_USER_DETAIL(Number(idSlot)),
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

  const goToList = () => {
    router.back();
  };

  return {
    userDetail,
    isPartner,
    handleDeleteUser,
    goToList,
  };
};
