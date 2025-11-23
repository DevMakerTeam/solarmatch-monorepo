import { Address } from "react-daum-postcode";

export interface AddressSearchModalProps {
  onComplete: (data: Address) => void;
  closeModal: () => void;
}
