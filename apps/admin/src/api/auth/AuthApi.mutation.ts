import { isNotNullish, Parameter, UseMutationParams } from "@repo/types";
import { useMutation } from "@tanstack/react-query";
import authApi from "./AuthApi";

export const AUTH_API_MUTATION_KEY = {
  LOGIN: (params?: Parameter<typeof authApi.login>) =>
    ["login", params].filter(isNotNullish),
  LOGOUT: (params?: Parameter<typeof authApi.logout>) =>
    ["logout", params].filter(isNotNullish),
  REFRESH: (params?: Parameter<typeof authApi.refresh>) =>
    ["refresh", params].filter(isNotNullish),
};

export const useLoginMutation = (
  params?: UseMutationParams<typeof authApi.login>
) => {
  return useMutation({
    mutationFn: authApi.login,
    ...params?.options,
  });
};

export const useLogoutMutation = (
  params?: UseMutationParams<typeof authApi.logout>
) => {
  return useMutation({
    mutationFn: authApi.logout,
    ...params?.options,
  });
};

export const useRefreshMutation = (
  params?: UseMutationParams<typeof authApi.refresh>
) => {
  return useMutation({
    mutationFn: authApi.refresh,
    ...params?.options,
  });
};
