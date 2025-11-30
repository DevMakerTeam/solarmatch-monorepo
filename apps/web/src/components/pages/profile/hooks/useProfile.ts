import { useAuthStatus } from "@/hooks/useAuthStatus";
import { useModals } from "@repo/hooks";
import ChangePhoneNumModal from "../components/ChangePhoneNumModal";
import ChangePasswordModal from "../components/ChangePasswordModal";

export const useProfile = () => {
  const { user, isLoading: isLoadingUser } = useAuthStatus();
  const { partnerStatus } = user || {};

  const { open: openChangePhoneNumModal, close: closeChangePhoneNumModal } =
    useModals();
  const { open: openChangePasswordModal, close: closeChangePasswordModal } =
    useModals();

  const handleChangePhoneNum = () => {
    openChangePhoneNumModal(ChangePhoneNumModal, {
      onClose: closeChangePhoneNumModal,
    });
  };
  const handleChangePassword = () => {
    openChangePasswordModal(ChangePasswordModal, {
      onClose: closeChangePasswordModal,
    });
  };

  console.log({ isLoadingUser });

  return {
    user,
    partnerStatus,
    handleChangePhoneNum,
    handleChangePassword,
    isLoadingUser,
  };
};
