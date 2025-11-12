import { ModalContainer } from "@repo/ui/modal";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import localFont from "next/font/local";
import { useCallback, useEffect, useState } from "react";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { MeModel } from "@/api/auth/types/model/me-model";
import { AUTH_API_QUERY_KEY } from "@/api/auth/AuthApi.query";
import { isTokenExpired } from "@/utils/authToken";
import type { RefreshModel } from "@/api/auth/types/model/refresh-model";
import { serializeCookie } from "@/pages/api/auth/utils/cookies";
import {
  AuthProvider,
  defaultAuthState,
  type AuthState,
} from "@/contexts/AuthContext";

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

export default function MyApp({ Component, pageProps }: CustomAppProps) {
  const [queryClient] = useState(() => new QueryClient());

  const authInitialState: AuthState =
    pageProps.authInitialState ?? defaultAuthState;

  const handleAuthStateChange = useCallback(
    (state: AuthState) => {
      if (state.isLoggedIn && state.user) {
        queryClient.setQueryData(AUTH_API_QUERY_KEY.ME(), {
          success: true,
          data: state.user,
        });
      } else {
        queryClient.removeQueries({
          queryKey: AUTH_API_QUERY_KEY.ME(),
        });
      }
    },
    [queryClient]
  );

  useEffect(() => {
    handleAuthStateChange(authInitialState);
  }, [authInitialState, handleAuthStateChange]);

  return (
    <div className={pretendard.variable}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider
          initialState={authInitialState}
          onAuthStateChange={handleAuthStateChange}
        >
          <Component {...pageProps} />
        </AuthProvider>

        <ModalContainer />

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  const { ctx } = appContext;
  const req = ctx.req;

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

    const buildCookieHeader = (cookies: Record<string, string>) =>
      Object.entries(cookies)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) => `${key}=${value}`)
        .join("; ");

    const isProduction = process.env.NODE_ENV === "production";

    const protocol =
      (req.headers["x-forwarded-proto"] as string | undefined) ?? "http";
    const host = req.headers.host;

    if (host) {
      const origin = `${protocol}://${host}`;
      const cookies = parseCookies(req.headers.cookie);
      let accessToken = cookies.accessToken;
      const refreshToken = cookies.refreshToken;

      const setResponseCookies = (
        access: string,
        refresh: string | undefined
      ) => {
        if (!ctx.res) {
          return;
        }

        const cookieHeaders = [
          serializeCookie("accessToken", access, {
            secure: isProduction,
          }),
        ];

        if (refresh) {
          cookieHeaders.push(
            serializeCookie("refreshToken", refresh, {
              secure: isProduction,
            })
          );
        }

        ctx.res.setHeader("Set-Cookie", cookieHeaders);
      };

      const clearResponseCookies = () => {
        if (!ctx.res) {
          return;
        }

        ctx.res.setHeader("Set-Cookie", [
          serializeCookie("accessToken", "", {
            secure: isProduction,
            maxAge: 0,
          }),
          serializeCookie("refreshToken", "", {
            secure: isProduction,
            maxAge: 0,
          }),
        ]);
      };

      const refreshAccessToken = async () => {
        try {
          const refreshResponse = await fetch(`${origin}/api/auth/refresh`, {
            method: "POST",
            headers: {
              cookie: buildCookieHeader(cookies),
            },
          });

          if (!refreshResponse.ok) {
            clearResponseCookies();
            return false;
          }

          const refreshData = (await refreshResponse.json()) as RefreshModel;

          if (!refreshData.success) {
            clearResponseCookies();
            return false;
          }

          const { accessToken: refreshedAccessToken } = refreshData.data;
          const refreshedRefreshToken = (
            refreshData.data as typeof refreshData.data & {
              refreshToken?: string;
            }
          ).refreshToken;

          accessToken = refreshedAccessToken;
          cookies.accessToken = refreshedAccessToken;

          if (refreshedRefreshToken) {
            cookies.refreshToken = refreshedRefreshToken;
          }

          setResponseCookies(refreshedAccessToken, refreshedRefreshToken);

          return true;
        } catch (error) {
          console.error("Failed to refresh access token on server:", error);
          clearResponseCookies();
          return false;
        }
      };

      const ensureValidAccessToken = async () => {
        if (accessToken) {
          const isExpired = isTokenExpired(accessToken, 5);

          if (!isExpired) {
            return true;
          }
        }

        if (!refreshToken) {
          clearResponseCookies();
          return false;
        }

        return refreshAccessToken();
      };

      try {
        const hasValidAccessToken = await ensureValidAccessToken();

        if (hasValidAccessToken) {
          const response = await fetch(`${origin}/api/auth/me`, {
            headers: {
              cookie: buildCookieHeader(cookies),
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (response.ok) {
            const data = (await response.json()) as MeModel;
            if (data.success) {
              authInitialState = {
                isLoggedIn: true,
                user: data.data,
                userName: data.data.name,
              };
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch auth state on server:", error);
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
