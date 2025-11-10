// 회원가입 페이지
import RootLayout from "@/components/Layout/root";
import { Button } from "@repo/ui/button";
import { Checkbox } from "@repo/ui/checkbox";
import { FormField } from "@repo/ui/form-field";
import { Icon } from "@repo/ui/icon";
import { Input } from "@repo/ui/input";
import { useSignup } from "./hooks/useSignup";
import { Controller, FormProvider } from "react-hook-form";
import { FormHelper } from "@repo/ui/form-helper";
import { cn } from "@repo/utils";
import { formatPhoneNumberKR } from "@repo/utils";

const SignupPage = () => {
  const {
    formMethods,
    handleSubmit,
    handleSendEmailVerificationCode,
    sendEmailVerificationSuccess,
    handleEmailVerifyCode,
    emailVerifyCodeSuccess,
    handleSendSmsVerificationCode,
    sendSmsVerificationSuccess,
    handleVerifySmsCode,
    verifySmsCodeSuccess,
    signupFormValidation,
  } = useSignup();

  return (
    <RootLayout>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit}>
          <div className="w-full flex flex-col lg:flex-row lg:justify-between layout-padding-y">
            <div className="bold-heading4 lg:bold-heading3 text-center lg:text-left lg:max-w-[140px] mb-[65px] lg:mb-0">
              이메일 회원가입
            </div>

            <div className="flex flex-col w-full lg:max-w-[65%]">
              <FormField label="아이디" required className="mb-[30px]">
                <div className="flex flex-col gap-[10px]">
                  <Controller
                    control={formMethods.control}
                    name="email"
                    render={({
                      field,
                      formState: { errors },
                      fieldState: { invalid },
                    }) => (
                      <div
                        className={cn(
                          "flex items-center gap-[10px]",
                          errors.email?.message && "items-start"
                        )}
                      >
                        <FormHelper message={{ error: errors.email?.message }}>
                          <Input
                            className="input-size-md"
                            placeholder="이메일 주소를 입력해 주세요."
                            required
                            disabled={sendEmailVerificationSuccess}
                            {...field}
                          />
                        </FormHelper>

                        <Button
                          className="max-w-[97px] lg:max-w-[120px] w-full button-size-lg"
                          disabled={
                            invalid ||
                            !field.value ||
                            sendEmailVerificationSuccess
                          }
                          onClick={() =>
                            handleSendEmailVerificationCode(field.value)
                          }
                        >
                          인증하기
                        </Button>
                      </div>
                    )}
                  />

                  <Controller
                    control={formMethods.control}
                    name="emailVerifyCode"
                    render={({ field, fieldState: { invalid } }) => (
                      <div className="flex items-center gap-[10px]">
                        <Input
                          className="input-size-md"
                          placeholder="인증번호 6자리를 입력해 주세요."
                          disabled={
                            !sendEmailVerificationSuccess ||
                            emailVerifyCodeSuccess
                          }
                          maxLength={6}
                          {...field}
                        />

                        <Button
                          className="max-w-[97px] lg:max-w-[120px] w-full button-size-lg"
                          disabled={
                            invalid || !field.value || emailVerifyCodeSuccess
                          }
                          onClick={() => handleEmailVerifyCode(field.value)}
                        >
                          확인
                        </Button>
                      </div>
                    )}
                  />
                </div>
              </FormField>

              <FormField
                label="비밀번호"
                required
                className="mb-[50px] lg:mb-[40px]"
              >
                <div className="flex flex-col w-full gap-[10px]">
                  <div className="flex items-center gap-[6px]">
                    <Icon
                      iconName="circleExclamation"
                      className="w-[16.4px] text-middle-gray"
                    />

                    <span className="medium-small">
                      8~16자 영문, 숫자, 특수문자를 조합하여 입력해 주세요.
                    </span>
                  </div>

                  <Controller
                    control={formMethods.control}
                    name="password"
                    render={({ field, formState: { errors } }) => (
                      <FormHelper message={{ error: errors.password?.message }}>
                        <Input
                          placeholder="비밀번호를 입력해 주세요."
                          type="password"
                          className="input-size-md"
                          maxLength={16}
                          {...field}
                        />
                      </FormHelper>
                    )}
                  />

                  <Controller
                    control={formMethods.control}
                    name="passwordConfirm"
                    render={({ field, formState: { errors } }) => (
                      <FormHelper
                        message={{ error: errors.passwordConfirm?.message }}
                      >
                        <Input
                          placeholder="입력한 비밀번호를 한번 더 입력해 주세요."
                          type="password"
                          className="input-size-md"
                          maxLength={16}
                          {...field}
                        />
                      </FormHelper>
                    )}
                  />
                </div>
              </FormField>

              <FormField label="이름" required className="mb-[40px]">
                <div className="flex flex-col gap-[10px]">
                  <span className="text-caption">
                    원활한 서비스 이용을 위해 실명을 입력해 주세요.
                  </span>

                  <Controller
                    control={formMethods.control}
                    name="name"
                    render={({ field, formState: { errors } }) => (
                      <FormHelper message={{ error: errors.name?.message }}>
                        <Input
                          placeholder="실명을 입력해 주세요."
                          className="input-size-md"
                          maxLength={4}
                          {...field}
                        />
                      </FormHelper>
                    )}
                  />
                </div>
              </FormField>

              <FormField label="휴대전화 번호" required className="mb-[30px]">
                <div className="flex flex-col gap-[10px]">
                  <Controller
                    control={formMethods.control}
                    name="phone"
                    render={({
                      field,
                      formState: { errors },
                      fieldState: { invalid },
                    }) => (
                      <div
                        className={cn(
                          "flex items-center gap-[10px]",
                          errors.phone?.message && "items-start"
                        )}
                      >
                        <FormHelper message={{ error: errors.phone?.message }}>
                          <Input
                            className="input-size-md"
                            placeholder="휴대전화 번호를 입력해 주세요."
                            maxLength={13}
                            required
                            disabled={sendSmsVerificationSuccess}
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
                          disabled={
                            invalid ||
                            !field.value ||
                            sendSmsVerificationSuccess
                          }
                          onClick={() =>
                            handleSendSmsVerificationCode(field.value)
                          }
                        >
                          인증하기
                        </Button>
                      </div>
                    )}
                  />

                  <Controller
                    control={formMethods.control}
                    name="smsVerifyCode"
                    render={({ field, fieldState: { invalid } }) => (
                      <div className="flex items-center gap-[10px]">
                        <Input
                          className="input-size-md"
                          placeholder="인증번호 6자리를 입력해 주세요."
                          disabled={
                            !sendSmsVerificationSuccess || verifySmsCodeSuccess
                          }
                          maxLength={6}
                          {...field}
                        />

                        <Button
                          className="max-w-[97px] lg:max-w-[120px] w-full button-size-lg"
                          disabled={
                            invalid || !field.value || verifySmsCodeSuccess
                          }
                          onClick={() => handleVerifySmsCode(field.value)}
                        >
                          확인
                        </Button>
                      </div>
                    )}
                  />
                </div>
              </FormField>

              {/* <label
              htmlFor="all-agree"
              className="flex items-center gap-[12px] lg:gap-[16px] bold-body cursor-pointer w-fit mb-[14px]"
            >
              <Checkbox id="all-agree" name="all-agree" />
              전체 동의
            </label>

            <div className="w-full flex flex-col gap-[10px] mb-[40px] lg:mb-[70px]">
              <TermItem
                id="service-agree"
                name="service-agree"
                label="만 14세 이상 사용자 입니다."
              />
              <TermItem
                id="privacy-agree"
                name="privacy-agree"
                label="솔라매치 이용약관"
                onViewClick={() => console.log("솔라매치 이용약관 보기")}
              />
              <TermItem
                id="marketing-agree"
                name="marketing-agree"
                label="개인정보수집 및 이용 동의"
                onViewClick={() =>
                  console.log("개인정보수집 및 이용 동의 보기")
                }
              />
            </div> */}

              <Button
                type="submit"
                className="button-size-lg lg:button-size-xl"
                disabled={!signupFormValidation}
              >
                회원가입 하기
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </RootLayout>
  );
};

export default SignupPage;

interface TermItemProps {
  id: string;
  name: string;
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  onViewClick?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TermItem = ({
  id,
  name,
  label,
  checked = false,
  onChange,
  onViewClick,
}: TermItemProps) => {
  const handleBoxClick = () => {
    onChange?.(!checked);
  };

  const handleViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewClick?.();
  };

  return (
    <div
      onClick={handleBoxClick}
      className="group flex items-center justify-between gap-[12px] p-[13px_22px] border border-border-color rounded-[8px] cursor-pointer hover:border-primary transition-colors"
    >
      <label
        htmlFor={id}
        className="flex items-center gap-[12px] medium-body cursor-pointer flex-1"
        onClick={e => e.stopPropagation()}
      >
        <Checkbox
          id={id}
          name={name}
          checked={checked}
          onChange={e => onChange?.(e.target.checked)}
          className="peer-hover:border-primary group-hover:border-primary"
        />
        <span>
          <span>{label}</span>
          <span className="text-border-color">&nbsp;(필수)</span>
        </span>
      </label>

      {onViewClick && (
        <Button
          variant="ghost"
          onClick={handleViewClick}
          className="medium-body px-[8px] py-[4px]"
        >
          보기
        </Button>
      )}
    </div>
  );
};
