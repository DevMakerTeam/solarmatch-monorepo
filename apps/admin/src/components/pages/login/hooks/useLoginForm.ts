import { LoginDto } from "@/api/auth/types/dto/login-dto";
import { HELPER_TEXT, REGEX } from "@repo/constants";
import { FieldValues, useForm, UseFormProps } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getCookie } from "@/utils/cookie";

interface LoginFormDataType extends LoginDto, FieldValues {
  isSave: boolean;
}

export const loginFormSchema = yup.object().shape({
  email: yup
    .string()
    .required(HELPER_TEXT.REQUIRED_INPUT)
    .matches(REGEX.EMAIL, HELPER_TEXT.EMAIL),
  password: yup
    .string()
    .required(HELPER_TEXT["REQUIRED_INPUT"])
    .matches(REGEX["PASSWORD"], HELPER_TEXT["PASSWORD"]),
  isSave: yup.boolean().required(),
});

export const useLoginForm = (options?: UseFormProps<LoginFormDataType>) => {
  const getSavedEmail = () => {
    return getCookie("savedEmail") || "";
  };

  const savedEmail = getSavedEmail();

  return useForm<LoginFormDataType>({
    resolver: yupResolver(loginFormSchema),
    mode: "onChange",
    defaultValues: {
      email: savedEmail,
      password: "",
      isSave: !!savedEmail,
    },
    ...options,
  });
};
