import axios, { AxiosError } from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// const isDev = process.env.NODE_ENV === "development";

instance.interceptors.response.use(
  res => {
    //   const { status, config: reqData, data: resData } = res;

    return res;
  },
  async (error: AxiosError) => {
    try {
      const { response: res, config: _ } = error || {};
      if (!res?.status) {
        throw new Error("response status is not exist");
      }

      const { status } = res;

      const isUnAuthError = status === 401;
      const isExpiredToken = status === 400;

      if (isExpiredToken) {
        throw new Error("expired token: please set refresh token logic");
      }

      if (isUnAuthError) {
        return Promise.reject(error);
      }
    } catch (e) {
      console.error(e);
    }
  }
);

export default instance;
