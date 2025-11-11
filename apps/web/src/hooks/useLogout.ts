import { useLogoutMutation } from "@/api/auth/AuthApi.mutation";
import { AUTH_API_QUERY_KEY } from "@/api/auth/AuthApi.query";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import type { MeModel } from "@/api/auth/types/model/me-model";
import { useAuthStore } from "@/stores/authStore";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const clearAuthState = useAuthStore(state => state.clearAuthState);

  const { mutate: logoutMutation, isPending } = useLogoutMutation({
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: AUTH_API_QUERY_KEY.ME(),
        });
        router.replace("/");
      },
    },
  });

  const handleLogout = () => {
    queryClient.setQueryData<MeModel | undefined>(
      AUTH_API_QUERY_KEY.ME(),
      undefined
    );
    clearAuthState();
    logoutMutation(undefined);
  };

  return {
    logout: handleLogout,
    isPending,
  };
};
