import { useModals } from "@repo/hooks";
import { useChangePasswordForm } from "./useChangePasswordForm";
import EmailLinkModal from "../components/EmailLinkModal";
import { usePasswordResetRequestMutation } from "@/api/auth/AuthApi.mutation";

export const useChangePassword = () => {
  const {
    control,
    formState: { isValid },
    handleSubmit: handleSubmitForm,
  } = useChangePasswordForm();
  const { open: openEmailLinkModal, close: closeEmailLinkModal } = useModals();

  // 비밀번호 재설정 요청
  const { mutate: passwordResetRequestMutation } =
    usePasswordResetRequestMutation({
      options: {
        onSuccess: () => {
          openEmailLinkModal(EmailLinkModal, { onClose: closeEmailLinkModal });
        },
      },
    });
  const handleSubmit = handleSubmitForm(({ email }) => {
    passwordResetRequestMutation({
      email,
    });
  });

  return { control, isValid, handleSubmit };
};
