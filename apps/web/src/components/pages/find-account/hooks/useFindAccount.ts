import { useFindAccountMutation } from "@/api/auth/AuthApi.mutation";
import { useFindAccountForm } from "./useFindAccountForm";
import {
  useSendVerificationMutation,
  useVerifyCodeMutation,
} from "@/api/sms/SmsApi.mutation";
import { useState } from "react";
import { FindAccountModelData } from "@/api/auth/types/model/find-account-model";

export const useFindAccount = () => {
  const formMethods = useFindAccountForm();
  const {
    getValues,
    formState: { isValid },
  } = formMethods;

  const [foundAccounts, setFoundAccounts] = useState<FindAccountModelData[]>(
    []
  );

  // SMS 인증 코드 발송
  const {
    mutate: sendVerificationMutation,
    isSuccess: sendVerificationSuccess,
    isPending: isSendVerificationPending,
  } = useSendVerificationMutation();
  const handleSendVerification = (phone: string) => {
    const phoneNumber = phone.replace(/[^0-9]/g, "");
    sendVerificationMutation({ phoneNumber });
  };

  // SMS 인증 코드 검증
  const {
    mutate: verifyCodeMutation,
    isSuccess: verifyCodeSuccess,
    isPending: isVerifyCodePending,
  } = useVerifyCodeMutation();
  const handleVerifyCode = (code: string) => {
    const phoneNumber = getValues("phoneNumber").replace(/[^0-9]/g, "");
    verifyCodeMutation({ phoneNumber, code });
  };

  // 계정 찾기 Form submit validation
  const findAccountFormValidation = isValid && verifyCodeSuccess;

  // 계정 찾기
  const {
    mutate: findAccountMutation,
    isSuccess: findAccountSuccess,
    isIdle: findAccountIdle,
    isPending: isFindAccountPending,
  } = useFindAccountMutation({
    options: {
      onSuccess: ({ data }) => {
        setFoundAccounts(data);
      },
    },
  });
  const handleSubmit = formMethods.handleSubmit(
    ({ name, phoneNumber: phone }) => {
      const phoneNumber = phone.replace(/[^0-9]/g, "");

      findAccountMutation({
        name,
        phoneNumber,
      });
    }
  );

  return {
    formMethods,
    findAccountSuccess,
    findAccountIdle,
    handleSubmit,
    sendVerificationSuccess,
    handleSendVerification,
    handleVerifyCode,
    verifyCodeSuccess,
    findAccountFormValidation,
    foundAccounts,
    isSendVerificationPending,
    isVerifyCodePending,
    isFindAccountPending,
  };
};
