import { Button } from "@repo/ui/button";
import { Icon } from "@repo/ui/icon";
import { Modal, ModalProps } from "@repo/ui/modal";

const EmailLinkModal = ({ onClose }: Omit<ModalProps, "children">) => {
  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col items-center">
        <Icon
          iconName="circleExclamation"
          className="w-[65px] h-[65px] text-primary mb-[14px]"
        />

        <p className="bold-body mb-[26px]">
          이메일로 재설정 링크를 전송했습니다.
        </p>

        <p className="whitespace-pre-line medium-body text-center mb-[21px]">
          {"입력하신 이메일에서\n 비밀번호를 다시 설정해주세요."}
        </p>

        <Button className="button-size-xl" onClick={onClose}>
          확인
        </Button>
      </div>
    </Modal>
  );
};

export default EmailLinkModal;
