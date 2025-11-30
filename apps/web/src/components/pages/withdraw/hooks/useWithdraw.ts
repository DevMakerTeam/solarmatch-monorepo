import { useModals } from "@repo/hooks";
import { ConfirmModal } from "@repo/ui/modal";
import { useState } from "react";
import { useWithdrawMutation } from "@/api/auth/AuthApi.mutation";
import { AUTH_API_QUERY_KEY } from "@/api/auth/AuthApi.query";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";

export const useWithdraw = () => {
  const [isAgree, setIsAgree] = useState(false);
  const handleToggleAgree = () => {
    setIsAgree(prev => !prev);
  };
  const { open: openWithdrawModal, close: closeWithdrawModal } = useModals();

  const queryClient = useQueryClient();
  const router = useRouter();
  const { clearAuthState } = useAuth();

  const { mutate: withdraw, isPending: isWithdrawPending } =
    useWithdrawMutation();

  const handleWithdraw = () => {
    queryClient.cancelQueries({ queryKey: AUTH_API_QUERY_KEY.ME() });

    withdraw(undefined, {
      onSuccess: () => {
        clearAuthState();
        // 모든 쿼리 캐시 클리어
        queryClient.clear();
        router.replace("/");
      },
    });
  };

  const handleWithdrawConfirm = () => {
    openWithdrawModal(ConfirmModal, {
      onConfirm: () => {
        handleWithdraw();
        closeWithdrawModal();
      },
      onClose: closeWithdrawModal,
      text: "정말 탈퇴하시겠습니까?",
    });
  };

  return {
    handleWithdrawConfirm,
    isAgree,
    handleToggleAgree,
    isWithdrawPending,
  };
};
