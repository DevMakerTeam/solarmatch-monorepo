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
import { formatPhoneNumberKR } from "@repo/utils";

export const useSignup = () => {
  const router = useRouter();
  const { email, phone, socialId } = router.query;

  // socialId가 있으면 카카오 로그인으로 간주
  const isKakaoSignup = !!socialId;

  const formMethods = useSignupForm({
    defaultValues: {
      email: typeof email === "string" ? email : "",
      phone:
        typeof phone === "string"
          ? formatPhoneNumberKR(phone.replace(/[^0-9]/g, ""))
          : "",
      emailVerifyCode: "",
      password: "",
      passwordConfirm: "",
      name: "",
      smsVerifyCode: "",
    },
    isKakaoSignup,
  });
  const {
    getValues,
    formState: { errors },
  } = formMethods;

  console.log({ errors });

  // 이메일 인증 코드 전송
  const {
    mutate: sendEmailVerificationMutation,
    isSuccess: sendEmailVerificationSuccess,
    isPending: isSendEmailVerificationPending,
  } = useSendEmailVerificationMutation();
  const handleSendEmailVerificationCode = (email: string) => {
    sendEmailVerificationMutation({ email });
  };

  // 이메일 인증 코드 확인
  const {
    mutate: emailVerifyCodeMutation,
    isSuccess: emailVerifyCodeSuccess,
    isPending: isEmailVerifyCodePending,
  } = useEmailVerifyCodeMutation();
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
    isPending: isSendSmsVerificationPending,
  } = useSendSmsVerificationMutation();
  const handleSendSmsVerificationCode = (phone: string) => {
    const phoneNumber = phone.replace(/[^0-9]/g, "");

    sendSmsVerificationMutation({ phoneNumber });
  };

  // SMS 인증 코드 검증
  const {
    mutate: verifySmsCodeMutation,
    isSuccess: verifySmsCodeSuccess,
    isPending: isVerifySmsCodePending,
  } = useVerifySmsCodeMutation();
  const handleVerifySmsCode = (code: string) => {
    const phoneNumber = getValues("phone").replace(/[^0-9]/g, "");

    verifySmsCodeMutation({
      code,
      phoneNumber,
    });
  };

  // 회원가입 Form submit validation
  // 카카오 로그인일 때는 이메일/SMS 인증 코드 검증 불필요
  const signupFormValidation = isKakaoSignup
    ? formMethods.formState.isValid
    : formMethods.formState.isValid &&
      emailVerifyCodeSuccess &&
      verifySmsCodeSuccess;

  const { mutate: signupMutation, isPending: isSignupPending } =
    useSignupMutation({
      options: {
        onSuccess: () => {
          router.replace("/login");
        },
      },
    });
  const handleSubmit = formMethods.handleSubmit(data => {
    const { phone } = data;

    if (isKakaoSignup) {
      signupMutation({
        email: data.email,
        name: data.name,
        phone: phone.replace(/[^0-9]/g, ""),
        socialId: String(socialId),
        provider: "KAKAO",
      });
    } else {
      signupMutation({
        email: data.email,
        name: data.name,
        password: data.password,
        phone: phone.replace(/[^0-9]/g, ""),
        provider: "LOCAL",
      });
    }
  });

  return {
    formMethods,
    handleSubmit,
    handleSendEmailVerificationCode,
    isSendEmailVerificationPending,
    sendEmailVerificationSuccess,
    handleEmailVerifyCode,
    emailVerifyCodeSuccess,
    handleSendSmsVerificationCode,
    sendSmsVerificationSuccess,
    handleVerifySmsCode,
    verifySmsCodeSuccess,
    signupFormValidation,
    isEmailVerifyCodePending,
    isSendSmsVerificationPending,
    isVerifySmsCodePending,
    isSignupPending,
    isKakaoSignup,
  };
};
