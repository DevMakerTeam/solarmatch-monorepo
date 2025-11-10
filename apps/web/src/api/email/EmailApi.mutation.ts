import { isNotNullish, Parameter, UseMutationParams } from "@repo/types";
import emailApi from "./EmailApi";
import { useMutation } from "@tanstack/react-query";

export const EMAIL_API_MUTATION_KEY = {
  SEND_VERIFICATION: (params?: Parameter<typeof emailApi.sendVerification>) =>
    ["email-send-verification", params].filter(isNotNullish),
  VERIFY_CODE: (params?: Parameter<typeof emailApi.verifyCode>) =>
    ["email-verify-code", params].filter(isNotNullish),
};

// 이메일 인증 코드 전송
export const useSendVerificationMutation = (
  params?: UseMutationParams<typeof emailApi.sendVerification>
) => {
  return useMutation({
    mutationFn: emailApi.sendVerification,
    ...params?.options,
  });
};

// 인증 코드 확인
export const useVerifyCodeMutation = (
  params?: UseMutationParams<typeof emailApi.verifyCode>
) => {
  return useMutation({
    mutationFn: emailApi.verifyCode,
    ...params?.options,
  });
};
