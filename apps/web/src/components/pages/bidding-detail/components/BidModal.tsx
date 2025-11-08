import { Modal, ModalProps } from "@repo/ui/modal";

const BidModal = ({ onClose }: Pick<ModalProps, "onClose">) => {
  return <Modal onClose={onClose}>OrdersDetailBidModal</Modal>;
};

export default BidModal;
