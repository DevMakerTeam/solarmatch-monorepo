import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";

const LOGIN_PATH = "/login";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    const isLoginPage = pathname === LOGIN_PATH;
    const isApiRoute = pathname.startsWith("/api");

    if (!isLoggedIn && !isLoginPage && !isApiRoute) {
      router.replace(LOGIN_PATH);
    }

    if (isLoggedIn && isLoginPage) {
      router.replace("/");
    }
  }, [isLoggedIn, pathname, router]);

  if (!isLoggedIn && pathname !== LOGIN_PATH && !pathname.startsWith("/api")) {
    return null;
  }

  return <>{children}</>;
};
