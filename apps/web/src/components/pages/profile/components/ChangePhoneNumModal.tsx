import { Button } from "@repo/ui/button";
import { FormField } from "@repo/ui/form-field";
import { Input } from "@repo/ui/input";
import { Modal, ModalProps } from "@repo/ui/modal";

const ChangePhoneNumModal = ({ onClose }: Omit<ModalProps, "children">) => {
  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col items-center">
        <span className="bold-heading6 md:bold-heading5 mb-[40px] md:mb-[60px]">
          휴대전화 번호 변경하기
        </span>

        <FormField label="휴대전화 번호" className="mb-[40px] md:mb-[60px]">
          <div className="flex flex-col gap-[10px] w-full">
            <div className="flex gap-[10px] items-center">
              <Input
                className="input-size-sm md:input-size-md w-full"
                placeholder="휴대전화 번호를 입력해 주세요."
              />

              <Button className="button-size-md md:button-size-lg bold-caption md:bold-body w-[135px] md:w-[120px]">
                인증하기
              </Button>
            </div>

            <div className="flex gap-[10px] items-center">
              <Input
                className="input-size-sm md:input-size-md w-full"
                placeholder="인증번호 6자리를 입력해 주세요."
                disabled
              />

              <Button
                className="button-size-md md:button-size-lg bold-caption md:bold-body w-[135px] md:w-[120px]"
                disabled
              >
                확인
              </Button>
            </div>
          </div>
        </FormField>

        <div className="flex items-center gap-[8px] md:gap-[12px] w-full">
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

export default ChangePhoneNumModal;
