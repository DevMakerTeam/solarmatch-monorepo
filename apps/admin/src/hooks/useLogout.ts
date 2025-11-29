import { useLogoutMutation } from "@/api/auth/AuthApi.mutation";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { clearAuthState } = useAuth();

  const { mutate, isPending } = useLogoutMutation();

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        clearAuthState();
        // 모든 쿼리 캐시 클리어
        queryClient.clear();
        // AuthGuard가 자동으로 로그인 페이지로 리다이렉트
      },
    });
  };

  return {
    logout: handleLogout,
    isPending,
  };
};
