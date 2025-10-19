import { ReactNode } from "react";

export interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  modalContainerClassName?: string;
  modalContentClassName?: string;
}

export interface ConfirmModalProps extends Omit<ModalProps, "children"> {
  onConfirm: () => void;
  text: string;
}
