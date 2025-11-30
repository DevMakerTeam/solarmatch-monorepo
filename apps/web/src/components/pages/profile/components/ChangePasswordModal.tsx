import { Button } from "@repo/ui/button";
import { FormField } from "@repo/ui/form-field";
import { Input } from "@repo/ui/input";
import { Modal, ModalProps } from "@repo/ui/modal";
import { useChangePasswordForm } from "../hooks/useChangePasswordForm";
import { FormHelper } from "@repo/ui/form-helper";
import { Controller } from "react-hook-form";
import { usePasswordChangeMutation } from "@/api/auth/AuthApi.mutation";
import { toast } from "@repo/utils";

const ChangePasswordModal = ({ onClose }: Omit<ModalProps, "children">) => {
  const {
    control,
    formState: { isValid },
    handleSubmit: handleSubmitForm,
  } = useChangePasswordForm();

  // 비밀번호 변경
  const { mutate, isPending } = usePasswordChangeMutation({
    options: {
      onSuccess: ({ message }) => {
        toast(message);
        onClose();
      },
    },
  });

  const handleSubmit = handleSubmitForm(({ currentPassword, newPassword }) => {
    mutate({
      currentPassword,
      newPassword,
    });
  });

  return (
    <Modal onClose={onClose}>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <span className="bold-heading6 md:bold-heading5 mb-[40px] md:mb-[60px]">
          비밀번호 변경하기
        </span>

        <div className="flex flex-col gap-[30px] w-full mb-[30px]">
          <FormField label="현재 비밀번호">
            <Controller
              control={control}
              name="currentPassword"
              render={({ field, formState: { errors } }) => (
                <FormHelper
                  message={{ error: errors.currentPassword?.message }}
                >
                  <Input
                    className="input-size-sm md:input-size-md w-full"
                    placeholder="현재 비밀번호를 입력해 주세요."
                    type="password"
                    {...field}
                  />
                </FormHelper>
              )}
            />
          </FormField>

          <FormField label="새 비밀번호">
            <div className="flex flex-col gap-[10px]">
              <Controller
                control={control}
                name="newPassword"
                render={({ field, formState: { errors } }) => (
                  <FormHelper message={{ error: errors.newPassword?.message }}>
                    <Input
                      className="input-size-sm md:input-size-md w-full"
                      placeholder="8~16자 영문, 숫자, 특수문자 조합을 입력해 주세요."
                      type="password"
                      {...field}
                    />
                  </FormHelper>
                )}
              />

              <Controller
                control={control}
                name="newPasswordConfirm"
                render={({ field, formState: { errors } }) => (
                  <FormHelper
                    message={{ error: errors.newPasswordConfirm?.message }}
                  >
                    <Input
                      className="input-size-sm md:input-size-md w-full"
                      placeholder="입력한 비밀번호를 한번 더 입력해 주세요."
                      type="password"
                      {...field}
                    />
                  </FormHelper>
                )}
              />
            </div>
          </FormField>
        </div>

        <div className="w-full flex items-center gap-[8px] md:gap-[12px]">
          <Button
            variant="outline"
            className="button-size-md md:button-size-lg"
            onClick={onClose}
            type="button"
          >
            취소
          </Button>
          <Button
            className="button-size-md md:button-size-lg"
            type="submit"
            disabled={!isValid || isPending}
            isLoading={isPending}
          >
            확인
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;
