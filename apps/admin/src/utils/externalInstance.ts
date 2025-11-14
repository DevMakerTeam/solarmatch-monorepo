import axios, { AxiosHeaders, AxiosInstance } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

const externalInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

if (!API_BASE_URL && process.env.NODE_ENV === "development") {
  console.warn(
    "[axios] NEXT_PUBLIC_API_BASE_URL is not configured; externalInstance will use relative URLs."
  );
}

const getAccessToken = () => {
  if (typeof document === "undefined") {
    return undefined;
  }

  const match = document.cookie.match(/(?:^|; )accessToken=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : undefined;
};

externalInstance.interceptors.request.use(config => {
  const token = getAccessToken();

  if (token) {
    const headers = config.headers ?? {};
    const nextHeaders =
      typeof (headers as AxiosHeaders).set === "function"
        ? (headers as AxiosHeaders)
        : new AxiosHeaders(headers);

    nextHeaders.set("Authorization", `Bearer ${token}`);
    config.headers = nextHeaders;
  }

  return config;
});

export default externalInstance;
