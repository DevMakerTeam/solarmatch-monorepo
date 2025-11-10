import { useMutation } from "@tanstack/react-query";
import { isNotNullish, Parameter, UseMutationParams } from "@repo/types";
import authApi from "./AuthApi";

export const AUTH_API_MUTATION_KEY = {
  SIGNUP: (params?: Parameter<typeof authApi.signup>) =>
    ["signup", params].filter(isNotNullish),
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
