import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getAccessToken, isTokenExpired } from "@/utils/authToken";

export const useAuthStatus = () => {
  const { isLoggedIn, setAuthState, clearAuthState } = useAuth();

  useEffect(() => {
    const checkAuthStatus = () => {
      const accessToken = getAccessToken();

      if (accessToken && !isTokenExpired(accessToken, 5)) {
        setAuthState({
          isLoggedIn: true,
        });
      } else {
        clearAuthState();
      }
    };

    checkAuthStatus();

    const interval = setInterval(checkAuthStatus, 60000);

    return () => clearInterval(interval);
  }, [setAuthState, clearAuthState]);

  return {
    isLoggedIn,
  };
};
