import { yupResolver } from "@hookform/resolvers/yup";

import { HELPER_TEXT, REGEX } from "@repo/constants";
import { FieldValues, useForm, UseFormProps, Resolver } from "react-hook-form";

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

// 일반 회원가입 스키마
const normalSignupFormSchema = yup.object().shape({
  email: yup
    .string()
    .required(HELPER_TEXT.REQUIRED_INPUT)
    .matches(REGEX.EMAIL, HELPER_TEXT.EMAIL),
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

// 카카오 로그인 회원가입 스키마
const kakaoSignupFormSchema = yup.object().shape({
  email: yup.string().optional(),
  emailVerifyCode: yup.string().optional(),
  name: yup
    .string()
    .required(HELPER_TEXT["REQUIRED_INPUT"])
    .matches(REGEX["NAME"], HELPER_TEXT["NAME"])
    .min(2, HELPER_TEXT["NAME_LENGTH_MIN"])
    .max(4, HELPER_TEXT["NAME_LENGTH_MAX"]),
  phone: yup.string().optional(),
});

export const signupFormSchema = (isKakaoSignup: boolean = false) =>
  isKakaoSignup ? kakaoSignupFormSchema : normalSignupFormSchema;

export const useSignupForm = (
  options?: UseFormProps<SignupFormDataType> & {
    isKakaoSignup?: boolean;
  }
) => {
  const { isKakaoSignup = false, ...restOptions } = options || {};

  return useForm<SignupFormDataType>({
    resolver: yupResolver(
      signupFormSchema(isKakaoSignup)
    ) as unknown as Resolver<SignupFormDataType>,
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
    ...restOptions,
  });
};
