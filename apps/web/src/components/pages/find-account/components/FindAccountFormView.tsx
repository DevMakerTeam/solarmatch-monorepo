import { Button } from "@repo/ui/button";
import { FormField } from "@repo/ui/form-field";
import { Input } from "@repo/ui/input";
import type { FormEventHandler } from "react";
import { FindAccountFormDataType } from "../hooks/useFindAccountForm";
import { Controller, useFormContext } from "react-hook-form";
import { FormHelper } from "@repo/ui/form-helper";
import { cn, formatPhoneNumberKR } from "@repo/utils";

interface FindAccountFormViewProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  sendVerificationSuccess: boolean;
  handleSendVerification: (phone: string) => void;
  handleVerifyCode: (code: string) => void;
  verifyCodeSuccess: boolean;
  findAccountFormValidation: boolean;
  isSendVerificationPending: boolean;
  isVerifyCodePending: boolean;
  isFindAccountPending: boolean;
}

const FindAccountFormView = ({
  onSubmit,
  sendVerificationSuccess,
  handleSendVerification,
  handleVerifyCode,
  verifyCodeSuccess,
  findAccountFormValidation,
  isSendVerificationPending,
  isVerifyCodePending,
  isFindAccountPending,
}: FindAccountFormViewProps) => {
  const { control } = useFormContext<FindAccountFormDataType>();

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col text-center medium-heading6 mb-[45px] lg:mb-[65px]">
        <p>회원가입 시 입력했던 정보를</p>
        <p>입력해주세요.</p>
      </div>

      <Controller
        control={control}
        name="name"
        render={({ field, formState: { errors } }) => (
          <FormField label="이름" required className="mb-[40px]">
            <FormHelper message={{ error: errors.name?.message }}>
              <Input
                placeholder="이름을 입력해 주세요."
                className="input-size-md"
                maxLength={4}
                {...field}
              />
            </FormHelper>
          </FormField>
        )}
      />

      <FormField label="휴대전화 번호" className="mb-[45px] lg:mb-[70px]">
        <div className="flex flex-col gap-[10px]">
          <Controller
            control={control}
            name="phoneNumber"
            render={({
              field,
              formState: { errors },
              fieldState: { invalid },
            }) => (
              <div
                className={cn(
                  "flex items-center gap-[10px]",
                  errors.phoneNumber?.message && "items-start"
                )}
              >
                <FormHelper message={{ error: errors.phoneNumber?.message }}>
                  <Input
                    className="input-size-md"
                    placeholder="휴대전화 번호를 입력해 주세요."
                    maxLength={13}
                    disabled={sendVerificationSuccess}
                    required
                    {...{
                      ...field,
                      value: field.value ?? "",
                      onChange: event => {
                        const formattedValue = formatPhoneNumberKR(
                          event.target.value
                        );

                        field.onChange(formattedValue);
                      },
                    }}
                  />
                </FormHelper>
                <Button
                  className="max-w-[97px] lg:max-w-[120px] w-full button-size-lg"
                  disabled={!field.value || invalid || sendVerificationSuccess}
                  onClick={() => handleSendVerification(field.value)}
                  isLoading={isSendVerificationPending}
                >
                  인증하기
                </Button>
              </div>
            )}
          />

          <Controller
            control={control}
            name="smsVerifyCode"
            render={({ field, fieldState: { invalid } }) => (
              <div className="flex items-center gap-[10px]">
                <Input
                  className="input-size-md"
                  placeholder="인증번호 6자리를 입력해 주세요."
                  disabled={!sendVerificationSuccess || verifyCodeSuccess}
                  maxLength={6}
                  {...field}
                />

                <Button
                  className="max-w-[97px] lg:max-w-[120px] w-full button-size-lg"
                  disabled={invalid || !field.value || verifyCodeSuccess}
                  onClick={() => handleVerifyCode(field.value)}
                  isLoading={isVerifyCodePending}
                >
                  확인
                </Button>
              </div>
            )}
          />
        </div>
      </FormField>

      <Button
        type="submit"
        className="button-size-xl"
        disabled={!findAccountFormValidation}
        isLoading={isFindAccountPending}
      >
        계정 찾기
      </Button>
    </form>
  );
};

export default FindAccountFormView;
