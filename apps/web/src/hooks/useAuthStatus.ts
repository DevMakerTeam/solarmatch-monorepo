import { useMeQuery } from "@/api/auth/AuthApi.query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export const useAuthStatus = () => {
  const { isLoggedIn, user, setAuthState, clearAuthState } = useAuth();

  const { data, isLoading, isFetching, isError, error, refetch } = useMeQuery({
    options: {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: isLoggedIn,
    },
  });

  useEffect(() => {
    if (data?.success) {
      setAuthState({
        isLoggedIn: true,
        user: data.data,
      });
    }
  }, [data, setAuthState]);

  useEffect(() => {
    if (error instanceof AxiosError && error.response?.status === 401) {
      clearAuthState();
    }
  }, [clearAuthState, error]);

  return {
    isLoggedIn,
    user,
    isLoading: isLoggedIn ? isLoading || isFetching : false,
    isError: isLoggedIn ? isError : false,
    error,
    refetch,
  };
};
