import { yupResolver } from "@hookform/resolvers/yup";

import { HELPER_TEXT, REGEX } from "@repo/constants";
import { FieldValues, useForm, UseFormProps } from "react-hook-form";

import * as yup from "yup";

export interface SignupFormDataType extends FieldValues {
  email: string;
  emailVerifyCode: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: string;
  smsVerifyCode: string;
}

export const signupFormSchema = yup.object().shape({
  email: yup
    .string()
    .required(HELPER_TEXT.REQUIRED_INPUT)
    .email(HELPER_TEXT.EMAIL),
  emailVerifyCode: yup
    .string()
    .required(HELPER_TEXT.REQUIRED_INPUT)
    .min(6, HELPER_TEXT.EMAIL_VERIFICATION_CODE_LENGTH),
  password: yup
    .string()
    .required(HELPER_TEXT["REQUIRED_INPUT"])
    .matches(REGEX["PASSWORD"], HELPER_TEXT["PASSWORD"]),
  passwordConfirm: yup
    .string()
    .required(HELPER_TEXT["REQUIRED_INPUT"])
    .oneOf([yup.ref("password")], HELPER_TEXT["PASSWORD_CONFIRM"]),
  name: yup
    .string()
    .required(HELPER_TEXT["REQUIRED_INPUT"])
    .matches(REGEX["NAME"], HELPER_TEXT["NAME"])
    .min(2, HELPER_TEXT["NAME_LENGTH_MIN"])
    .max(4, HELPER_TEXT["NAME_LENGTH_MAX"]),
  phone: yup
    .string()
    .required(HELPER_TEXT["REQUIRED_INPUT"])
    .matches(REGEX["PHONE"], HELPER_TEXT["PHONE"]),
  smsVerifyCode: yup
    .string()
    .required(HELPER_TEXT["REQUIRED_INPUT"])
    .min(6, HELPER_TEXT["SMS_VERIFICATION_CODE_LENGTH"]),
});

export const useSignupForm = (options?: UseFormProps<SignupFormDataType>) => {
  return useForm<SignupFormDataType>({
    resolver: yupResolver(signupFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      emailVerifyCode: "",
      name: "",
      password: "",
      passwordConfirm: "",
      smsVerifyCode: "",
      phone: "",
    },
    ...options,
  });
};
