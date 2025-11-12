import * as yup from "yup";

import { PasswordResetRequestDto } from "@/api/auth/types/dto/password-reset-request-dto";
import { FieldValues, useForm, UseFormProps } from "react-hook-form";
import { HELPER_TEXT, REGEX } from "@repo/constants";
import { yupResolver } from "@hookform/resolvers/yup";

export interface ChangePasswordFormDataType
  extends PasswordResetRequestDto,
    FieldValues {}

export const changePasswordFormSchema = yup.object().shape({
  email: yup
    .string()
    .required(HELPER_TEXT.REQUIRED_INPUT)
    .matches(REGEX.EMAIL, HELPER_TEXT.EMAIL),
});

export const useChangePasswordForm = (
  options?: UseFormProps<ChangePasswordFormDataType>
) => {
  return useForm<ChangePasswordFormDataType>({
    resolver: yupResolver(changePasswordFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
    ...options,
  });
};
