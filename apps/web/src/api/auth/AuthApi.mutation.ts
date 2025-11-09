import { useMutation } from "@tanstack/react-query";
import { UseMutationParams } from "@repo/types";
import authApi from "./AuthApi";

export const useSignupMutation = (
  params?: UseMutationParams<typeof authApi.signup>
) => {
  return useMutation({
    mutationFn: authApi.signup,
    ...params?.options,
  });
};
