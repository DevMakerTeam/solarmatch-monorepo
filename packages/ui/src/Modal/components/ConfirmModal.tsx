import { ConfirmModalProps } from "..";
import { Button } from "../../Button";
import { Icon } from "../../Icon";
import Modal from "../Modal";

/**
 *
 * @description 사용자의 행동을 확인받는 모달 컴포넌트입니다. (취소/확인 버튼 포함)
 */
const ConfirmModal = ({
  onConfirm,
  onClose,
  text,
  modalContainerClassName,
  modalContentClassName,
}: ConfirmModalProps) => {
  return (
    <Modal
      onClose={onClose}
      modalContainerClassName={modalContainerClassName}
      modalContentClassName={modalContentClassName}
    >
      <>
        <Icon
          iconName="circleExclamation"
          className="w-[56px] h-[56px] text-primary mx-auto mb-[32px]"
        />

        <p className="bold-body whitespace-pre-line text-center mb-[38px]">
          {text}
        </p>

        <div className="w-full flex items-center gap-[12px]">
          <Button
            variant="outline"
            className="button-size-lg w-full"
            onClick={onClose}
          >
            취소
          </Button>
          <Button
            variant="solid"
            className="button-size-lg w-full"
            onClick={onConfirm}
          >
            확인
          </Button>
        </div>
      </>
    </Modal>
  );
};

export default ConfirmModal;
