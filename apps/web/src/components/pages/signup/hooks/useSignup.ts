import { useSignupMutation } from "@/api/auth/AuthApi.mutation";
import { useSignupForm } from "./useSignupForm";
import {
  useSendVerificationMutation as useSendEmailVerificationMutation,
  useVerifyCodeMutation as useEmailVerifyCodeMutation,
} from "@/api/email/EmailApi.mutation";
import {
  useSendVerificationMutation as useSendSmsVerificationMutation,
  useVerifyCodeMutation as useVerifySmsCodeMutation,
} from "@/api/sms/SmsApi.mutation";
import { useRouter } from "next/router";

export const useSignup = () => {
  const formMethods = useSignupForm();
  const { getValues } = formMethods;

  const router = useRouter();

  // 이메일 인증 코드 전송
  const {
    mutate: sendEmailVerificationMutation,
    isSuccess: sendEmailVerificationSuccess,
  } = useSendEmailVerificationMutation();
  const handleSendEmailVerificationCode = (email: string) => {
    sendEmailVerificationMutation({ email });
  };

  // 이메일 인증 코드 확인
  const { mutate: emailVerifyCodeMutation, isSuccess: emailVerifyCodeSuccess } =
    useEmailVerifyCodeMutation();
  const handleEmailVerifyCode = (verificationCode: string) => {
    const email = getValues("email");

    emailVerifyCodeMutation({
      email,
      verificationCode,
    });
  };

  // SMS 인증 코드 발송
  const {
    mutate: sendSmsVerificationMutation,
    isSuccess: sendSmsVerificationSuccess,
  } = useSendSmsVerificationMutation();
  const handleSendSmsVerificationCode = (phone: string) => {
    const phoneNumber = phone.replace(/[^0-9]/g, "");

    sendSmsVerificationMutation({ phoneNumber });
  };

  // SMS 인증 코드 검증
  const { mutate: verifySmsCodeMutation, isSuccess: verifySmsCodeSuccess } =
    useVerifySmsCodeMutation();
  const handleVerifySmsCode = (code: string) => {
    const phoneNumber = getValues("phone").replace(/[^0-9]/g, "");

    verifySmsCodeMutation({
      code,
      phoneNumber,
    });
  };

  // 회원가입 Form submit validation
  const signupFormValidation =
    formMethods.formState.isValid &&
    emailVerifyCodeSuccess &&
    verifySmsCodeSuccess;

  const { mutate: signupMutation } = useSignupMutation({
    options: {
      onSuccess: () => {
        router.replace("/login");
      },
    },
  });
  const handleSubmit = formMethods.handleSubmit(data => {
    const { phone } = data;

    signupMutation({
      ...data,
      phone: phone.replace(/[^0-9]/g, ""),
    });
  });

  return {
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
  };
};
