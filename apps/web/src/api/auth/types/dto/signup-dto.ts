import { Provider } from "@repo/types";

export type SignupDto = {
  email: string;
  password?: string;
  name: string;
  phone: string;
  socialId?: string;
  provider?: Provider;
};
