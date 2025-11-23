import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import type { ApiResponse } from "@repo/types";
import { toastError } from "./toast";

interface RetriableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface CreateAxiosInstanceOptions {
  refreshEndpoint: string;
  loginEndpoint: string;
  logoutEndpoint: string;
  /**
   * 인증이 필요 없는 endpoint 목록
   * 이 endpoint들에서 401/400 에러가 발생해도 refresh/logout을 시도하지 않음
   * @default ["/api/auth/signup"]
   */
  excludedEndpoints?: string[];
}

const isServer = typeof window === "undefined";

/**
 * Axios 인스턴스를 생성하는 공통 함수
 * @param options - 엔드포인트 경로 설정
 * @returns AxiosInstance
 */
export function createAxiosInstance({
  refreshEndpoint,
  loginEndpoint,
  logoutEndpoint,
  excludedEndpoints = ["/api/auth/signup"],
}: CreateAxiosInstanceOptions): AxiosInstance {
  const instance: AxiosInstance = axios.create({
    baseURL: "", // 클라이언트에서는 Next.js API Route로 요청
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  // multipart/form-data 전송 시 Content-Type은 브라우저가 boundary 포함하여 자동 설정하도록 둔다
  instance.interceptors.request.use(config => {
    const hasFormDataBody =
      typeof FormData !== "undefined" && config.data instanceof FormData;
    if (hasFormDataBody) {
      // FormData 전송 시에는 Content-Type을 제거하여 브라우저가 boundary 포함해 자동 설정하도록 함
      if (config.headers instanceof AxiosHeaders) {
        config.headers.set("Content-Type", undefined);
      } else if (config.headers) {
        delete (config.headers as Record<string, unknown>)["Content-Type"];
      }
    }
    return config;
  });

  let isRefreshing = false;
  let refreshQueue: Array<{
    resolve: (value: AxiosResponse | PromiseLike<AxiosResponse>) => void;
    reject: (reason?: unknown) => void;
  }> = [];

  const processQueue = (error: unknown) => {
    refreshQueue.forEach(({ reject }) => reject(error));
    refreshQueue = [];
  };

  const resolveQueue = () => {
    refreshQueue.forEach(({ resolve }) =>
      resolve({} as AxiosResponse<unknown, unknown>)
    );
    refreshQueue = [];
  };

  const refreshAccessToken = async () => {
    if (!isServer && process.env.NODE_ENV === "development") {
      console.log("[axios] refreshing access token…");
    }
    const response = await fetch(refreshEndpoint, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      if (!isServer && process.env.NODE_ENV === "development") {
        console.warn(
          "[axios] refresh token request failed:",
          response.status,
          response.statusText
        );
      }
      throw new Error("Failed to refresh token");
    }
    if (!isServer && process.env.NODE_ENV === "development") {
      console.log("[axios] refresh token request succeeded");
    }
  };

  instance.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as
        | RetriableRequestConfig
        | undefined;
      const status = error.response?.status;
      const requestUrl = originalRequest?.url ?? "";

      if (!status || !originalRequest) {
        return Promise.reject(error);
      }

      const isLoginRequest = requestUrl.includes(loginEndpoint);
      const isRefreshRequest = requestUrl.includes(refreshEndpoint);
      const isLogoutRequest = requestUrl.includes(logoutEndpoint);
      const isExcludedRequest = excludedEndpoints.some(endpoint =>
        requestUrl.includes(endpoint)
      );

      if (
        (status === 401 || status === 400) &&
        !originalRequest._retry &&
        !isLoginRequest &&
        !isRefreshRequest &&
        !isLogoutRequest &&
        !isExcludedRequest
      ) {
        if (isRefreshing) {
          if (!isServer && process.env.NODE_ENV === "development") {
            console.log("[axios] enqueue request while refreshing token");
          }
          return new Promise<AxiosResponse>((resolve, reject) => {
            refreshQueue.push({ resolve, reject });
          }).then(() => instance(originalRequest));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          await refreshAccessToken();
          resolveQueue();
          if (!isServer && process.env.NODE_ENV === "development") {
            console.log("[axios] retry original request after refresh");
          }
          return instance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError);
          await fetch(logoutEndpoint, {
            method: "POST",
            credentials: "include",
          });
          if (!isServer && process.env.NODE_ENV === "development") {
            console.warn("[axios] refresh failed; logging out");
          }
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // 에러 메시지를 toast로 표시
      if (!isServer && error.response?.data) {
        const errorData = error.response.data as
          | ApiResponse<unknown>
          | { error?: string }
          | string;
        let errorMessage = "";

        if (typeof errorData === "string") {
          errorMessage = errorData;
        } else if ("message" in errorData && errorData.message) {
          errorMessage = errorData.message;
        } else if ("error" in errorData && errorData.error) {
          errorMessage = errorData.error;
        } else {
          errorMessage = "오류가 발생했습니다.";
        }

        // 리프레시 요청은 자동 처리되므로 에러 메시지 표시 제외
        // 로그인/로그아웃 요청은 에러 메시지 표시
        if (errorMessage && !isRefreshRequest) {
          toastError(errorMessage);
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
}
