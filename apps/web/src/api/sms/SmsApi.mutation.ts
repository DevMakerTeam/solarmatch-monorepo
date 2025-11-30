import { UseMutationParams } from "@repo/types";
import smsApi from "./SmsApi";
import { useMutation } from "@tanstack/react-query";

// SMS 인증 코드 발송
export const useSendVerificationMutation = (
  params?: UseMutationParams<typeof smsApi.sendVerification>
) => {
  return useMutation({
    mutationFn: smsApi.sendVerification,
    ...params?.options,
  });
};

// SMS 인증 코드 검증
export const useVerifyCodeMutation = (
  params?: UseMutationParams<typeof smsApi.verifyCode>
) => {
  return useMutation({
    mutationFn: smsApi.verifyCode,
    ...params?.options,
  });
};
