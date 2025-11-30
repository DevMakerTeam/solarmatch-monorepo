import { useMutation } from "@tanstack/react-query";
import { UseMutationParams } from "@repo/types";
import authApi from "./AuthApi";

// 회원가입
export const useSignupMutation = (
  params?: UseMutationParams<typeof authApi.signup>
) => {
  return useMutation({
    mutationFn: authApi.signup,
    ...params?.options,
  });
};

// 로그인
export const useLoginMutation = (
  params?: UseMutationParams<typeof authApi.login>
) => {
  return useMutation({
    mutationFn: authApi.login,
    ...params?.options,
  });
};

// 로그아웃
export const useLogoutMutation = (
  params?: UseMutationParams<typeof authApi.logout>
) => {
  return useMutation({
    mutationFn: authApi.logout,
    ...params?.options,
  });
};

// 액세스 토큰 갱신
export const useRefreshMutation = (
  params?: UseMutationParams<typeof authApi.refresh>
) => {
  return useMutation({
    mutationFn: authApi.refresh,
    ...params?.options,
  });
};

// 계정 찾기
export const useFindAccountMutation = (
  params?: UseMutationParams<typeof authApi.findAccount>
) => {
  return useMutation({
    mutationFn: authApi.findAccount,
    ...params?.options,
  });
};

// 비밀번호 재설정
export const usePasswordResetConfirmMutation = (
  params?: UseMutationParams<typeof authApi.passwordResetConfirm>
) => {
  return useMutation({
    mutationFn: authApi.passwordResetConfirm,
    ...params?.options,
  });
};

// 비밀번호 재설정 요청
export const usePasswordResetRequestMutation = (
  params?: UseMutationParams<typeof authApi.passwordResetRequest>
) => {
  return useMutation({
    mutationFn: authApi.passwordResetRequest,
    ...params?.options,
  });
};

// 회원탈퇴
export const useWithdrawMutation = (
  params?: UseMutationParams<typeof authApi.withdraw>
) => {
  return useMutation({
    mutationFn: authApi.withdraw,
    ...params?.options,
  });
};

// 비밀번호 변경
export const usePasswordChangeMutation = (
  params?: UseMutationParams<typeof authApi.passwordChange>
) => {
  return useMutation({
    mutationFn: authApi.passwordChange,
    ...params?.options,
  });
};
