import { useRouter } from "next/router";
import { useResetPasswordForm } from "./useResetPasswordForm";
import { useMemo } from "react";
import { usePasswordResetConfirmMutation } from "@/api/auth/AuthApi.mutation";

export const useResetPassword = () => {
  const router = useRouter();
  const { token } = router.query;
  const isTokenQueryReady = router.isReady;

  const {
    control,
    formState: { isValid },
    handleSubmit: handleSubmitForm,
  } = useResetPasswordForm();

  const resetPasswordValidation = useMemo(
    () => !isValid || !isTokenQueryReady || !token,
    [isValid, isTokenQueryReady, token]
  );

  // 비밀번호 재설정
  const {
    mutate: passwordResetConfirmMutation,
    isPending: isPasswordResetConfirmPending,
  } = usePasswordResetConfirmMutation({
    options: {
      onSuccess: () => {
        router.replace("/login");
      },
    },
  });
  const handleSubmit = handleSubmitForm(({ newPassword }) => {
    passwordResetConfirmMutation({
      newPassword,
      token: token as string,
    });
  });

  return {
    control,
    resetPasswordValidation,
    handleSubmit,
    isPasswordResetConfirmPending,
  };
};
