import { ModalContainer } from "@repo/ui/modal";
import { ToastContainer } from "@repo/ui/toast";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import localFont from "next/font/local";
import "../styles/globals.css";
import { useState, useCallback } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  AuthProvider,
  defaultAuthState,
  type AuthState,
} from "@/contexts/AuthContext";
import { isTokenExpired } from "@/utils/authToken";
import { AuthGuard } from "@/components/AuthGuard";

// Pretendard Variable을 next/font/local로 선언하여 자동 preload 및 FOIT 방지
const pretendard = localFont({
  src: [
    {
      path: "../fonts/PretendardVariable.woff2",
      weight: "45 920",
      style: "normal",
    },
  ],
  variable: "--font-family-pretendard",
  display: "swap",
});

type CustomAppProps = AppProps & {
  pageProps: AppProps["pageProps"] & {
    authInitialState?: AuthState;
  };
};

export default function AdminApp({ Component, pageProps }: CustomAppProps) {
  const [queryClient] = useState(() => new QueryClient());

  const authInitialState: AuthState =
    pageProps.authInitialState ?? defaultAuthState;

  const handleAuthStateChange = useCallback((state: AuthState) => {
    // 필요시 추가 로직 구현
    console.log(state);
  }, []);

  return (
    <div className={pretendard.variable}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider
          initialState={authInitialState}
          onAuthStateChange={handleAuthStateChange}
        >
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
        </AuthProvider>

        <ModalContainer />
        <ToastContainer />

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

AdminApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  const { ctx } = appContext;
  const req = ctx.req;
  const res = ctx.res;

  const LOGIN_PATH = "/login";

  let authInitialState: AuthState | undefined = undefined;

  if (req) {
    const parseCookies = (cookieHeader?: string) => {
      if (!cookieHeader) {
        return {} as Record<string, string>;
      }

      return cookieHeader
        .split(";")
        .reduce<Record<string, string>>((acc, cur) => {
          const [key, ...valueParts] = cur.trim().split("=");
          if (!key) {
            return acc;
          }

          acc[key] = valueParts.join("=");
          return acc;
        }, {});
    };

    const cookies = parseCookies(req.headers.cookie);
    const accessToken = cookies.accessToken;
    const isLoggedIn = accessToken && !isTokenExpired(accessToken, 5);

    if (isLoggedIn) {
      authInitialState = {
        isLoggedIn: true,
      };
    }

    const pathname = req.url?.split("?")[0] || "";
    const isLoginPage = pathname === LOGIN_PATH;
    const isApiRoute = pathname.startsWith("/api");

    if (res && !isApiRoute) {
      if (!isLoggedIn && !isLoginPage) {
        res.writeHead(302, {
          Location: LOGIN_PATH,
        });
        res.end();
        return { pageProps: {} };
      }

      if (isLoggedIn && isLoginPage) {
        res.writeHead(302, {
          Location: "/",
        });
        res.end();
        return { pageProps: {} };
      }
    }
  }

  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      authInitialState,
    },
  };
};
