import { LoginDto } from "@/api/auth/types/dto/login-dto";
import { yupResolver } from "@hookform/resolvers/yup";
import { HELPER_TEXT, REGEX } from "@repo/constants";
import { FieldValues, useForm } from "react-hook-form";

import * as yup from "yup";

export interface LoginFormDataType extends LoginDto, FieldValues {}

export const loginFormSchema = yup.object().shape({
  email: yup
    .string()
    .required(HELPER_TEXT.REQUIRED_INPUT)
    .matches(REGEX.EMAIL, HELPER_TEXT.EMAIL),
  password: yup
    .string()
    .required(HELPER_TEXT.REQUIRED_INPUT)
    .matches(REGEX["PASSWORD"], HELPER_TEXT["PASSWORD"]),
});

export const useLoginForm = () => {
  return useForm<LoginFormDataType>({
    resolver: yupResolver(loginFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
};
