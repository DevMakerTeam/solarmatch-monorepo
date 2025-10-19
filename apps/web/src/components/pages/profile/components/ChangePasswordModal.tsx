import { Button } from "@repo/ui/button";
import { FormField } from "@repo/ui/form-field";
import { Input } from "@repo/ui/input";
import { Modal, ModalProps } from "@repo/ui/modal";

const ChangePasswordModal = ({ onClose }: Omit<ModalProps, "children">) => {
  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col items-center">
        <span className="bold-heading6 md:bold-heading5 mb-[40px] md:mb-[60px]">
          비밀번호 변경하기
        </span>

        <div className="flex flex-col gap-[30px] w-full mb-[30px]">
          <FormField label="현재 비밀번호">
            <Input
              className="input-size-sm md:input-size-md w-full"
              placeholder="현재 비밀번호를 입력해 주세요."
              type="password"
            />
          </FormField>

          <FormField label="새 비밀번호">
            <div className="flex flex-col gap-[10px]">
              <Input
                className="input-size-sm md:input-size-md w-full"
                placeholder="8~16자 영문, 숫자, 특수문자 조합을 입력해 주세요."
                type="password"
              />

              <Input
                className="input-size-sm md:input-size-md w-full"
                placeholder="입력한 비밀번호를 한번 더 입력해 주세요."
                type="password"
              />
            </div>
          </FormField>
        </div>

        <div className="w-full flex items-center gap-[8px] md:gap-[12px]">
          <Button
            variant="outline"
            className="button-size-md md:button-size-lg"
            onClick={onClose}
          >
            취소
          </Button>
          <Button className="button-size-md md:button-size-lg">확인</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
