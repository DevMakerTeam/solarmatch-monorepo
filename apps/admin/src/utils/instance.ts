import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

interface RetriableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const isServer = typeof window === "undefined";

const instance: AxiosInstance = axios.create({
  baseURL: "", // 클라이언트에서는 Next.js API Route로 요청
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const REFRESH_ENDPOINT = "/api/admin/auth/refresh";
const LOGIN_ENDPOINT = "/api/admin/auth/login";
const LOGOUT_ENDPOINT = "/api/admin/auth/logout";

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
  const response = await fetch(REFRESH_ENDPOINT, {
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
    const originalRequest = error.config as RetriableRequestConfig | undefined;
    const status = error.response?.status;
    const requestUrl = originalRequest?.url ?? "";

    if (!status || !originalRequest) {
      return Promise.reject(error);
    }

    const isLoginRequest = requestUrl.includes(LOGIN_ENDPOINT);
    const isRefreshRequest = requestUrl.includes(REFRESH_ENDPOINT);
    const isLogoutRequest = requestUrl.includes(LOGOUT_ENDPOINT);

    if (
      (status === 401 || status === 400) &&
      !originalRequest._retry &&
      !isLoginRequest &&
      !isRefreshRequest &&
      !isLogoutRequest
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
        await fetch(LOGOUT_ENDPOINT, {
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

    return Promise.reject(error);
  }
);

export default instance;
