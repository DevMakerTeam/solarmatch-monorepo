import { useLogoutMutation } from "@/api/auth/AuthApi.mutation";
import { AUTH_API_QUERY_KEY } from "@/api/auth/AuthApi.query";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import type { MeModel } from "@/api/auth/types/model/me-model";
import { useAuth } from "@/contexts/AuthContext";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { clearAuthState, setAuthState } = useAuth();

  const { mutate, isPending } = useLogoutMutation();

  const handleLogout = () => {
    const previousMe = queryClient.getQueryData<MeModel | undefined>(
      AUTH_API_QUERY_KEY.ME()
    );

    queryClient.cancelQueries({ queryKey: AUTH_API_QUERY_KEY.ME() });

    mutate(undefined, {
      onSuccess: () => {
        clearAuthState();
        queryClient.removeQueries({
          queryKey: AUTH_API_QUERY_KEY.ME(),
          exact: true,
        });
        router.replace("/");
      },
      onError: () => {
        if (previousMe?.success) {
          setAuthState({
            isLoggedIn: true,
            user: previousMe.data,
            userName: previousMe.data.name,
          });
          queryClient.setQueryData(AUTH_API_QUERY_KEY.ME(), previousMe);
        }
      },
    });
  };

  return {
    logout: handleLogout,
    isPending,
  };
};
