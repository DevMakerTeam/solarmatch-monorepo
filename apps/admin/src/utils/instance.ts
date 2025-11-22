import { createAxiosInstance } from "@repo/utils";

const instance = createAxiosInstance({
  refreshEndpoint: "/api/admin/auth/refresh",
  loginEndpoint: "/api/admin/auth/login",
  logoutEndpoint: "/api/admin/auth/logout",
});

export default instance;
