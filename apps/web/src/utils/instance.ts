import { createAxiosInstance } from "@repo/utils";

const instance = createAxiosInstance({
  refreshEndpoint: "/api/auth/refresh",
  loginEndpoint: "/api/auth/login",
  logoutEndpoint: "/api/auth/logout",
});

export default instance;
