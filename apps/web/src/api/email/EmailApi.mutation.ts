import { UseMutationParams } from "@repo/types";
import emailApi from "./EmailApi";
import { useMutation } from "@tanstack/react-query";

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
