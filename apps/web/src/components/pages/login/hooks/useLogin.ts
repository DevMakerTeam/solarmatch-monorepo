import { useLoginMutation } from "@/api/auth/AuthApi.mutation";
import { useLoginForm } from "./useLoginForm";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import { AUTH_API_QUERY_KEY } from "@/api/auth/AuthApi.query";
import { useAuth } from "@/contexts/AuthContext";

export const useLogin = () => {
  const formMethods = useLoginForm();
  const router = useRouter();
  const { returnUrl } = router.query;
  const queryClient = useQueryClient();
  const { setAuthState } = useAuth();

  // 로그인
  const { mutate: loginMutation } = useLoginMutation({
    options: {
      onSuccess: ({ data }) => {
        const { name } = data;

        setAuthState({
          isLoggedIn: true,
          user: null,
          userName: name,
        });

        queryClient.invalidateQueries({
          queryKey: AUTH_API_QUERY_KEY.ME(),
        });

        const replaceUrl = returnUrl ? (returnUrl as string) : "/";
        router.replace(replaceUrl);
      },
    },
  });
  const handleLoginSubmit = formMethods.handleSubmit(({ email, password }) => {
    loginMutation({ email, password });
  });

  return {
    formMethods,
    handleLoginSubmit,
  };
};
