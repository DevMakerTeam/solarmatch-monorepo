import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import { Modal } from "../Modal";
import { AddressSearchModalProps } from "./types";

const AddressSearchModal = ({
  onComplete,
  closeModal,
}: AddressSearchModalProps) => {
  const handleComplete = (data: Address) => {
    onComplete(data);
    closeModal();
  };

  return (
    <Modal
      onClose={closeModal}
      modalContainerClassName="min-w-screen min-h-screen lg:min-w-[450px] lg:min-h-0 rounded-none lg:rounded-[20px]"
    >
      <DaumPostcodeEmbed onComplete={handleComplete} />
    </Modal>
  );
};

export default AddressSearchModal;
