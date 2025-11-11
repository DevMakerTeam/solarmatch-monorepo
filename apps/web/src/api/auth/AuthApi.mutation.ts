import { useMutation } from "@tanstack/react-query";
import { isNotNullish, Parameter, UseMutationParams } from "@repo/types";
import authApi from "./AuthApi";

export const AUTH_API_MUTATION_KEY = {
  SIGNUP: (params?: Parameter<typeof authApi.signup>) =>
    ["signup", params].filter(isNotNullish),
  LOGIN: (params?: Parameter<typeof authApi.login>) =>
    ["login", params].filter(isNotNullish),
  LOGOUT: (params?: Parameter<typeof authApi.logout>) =>
    ["logout", params].filter(isNotNullish),
  REFRESH: (params?: Parameter<typeof authApi.refresh>) =>
    ["refresh", params].filter(isNotNullish),
  FIND_ACCOUNT: (params?: Parameter<typeof authApi.findAccount>) =>
    ["find-account", params].filter(isNotNullish),
};

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
