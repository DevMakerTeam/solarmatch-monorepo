import * as yup from "yup";

import { PasswordResetConfirmDto } from "@/api/auth/types/dto/password-reset-confirm-dto";
import { FieldValues, useForm, UseFormProps } from "react-hook-form";
import { HELPER_TEXT, REGEX } from "@repo/constants";
import { yupResolver } from "@hookform/resolvers/yup";

export interface ResetPasswordFormDataType
  extends Pick<PasswordResetConfirmDto, "newPassword">,
    FieldValues {
  newPasswordConfirm: string;
}

export const resetPasswordFormSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required(HELPER_TEXT["REQUIRED_INPUT"])
    .matches(REGEX["PASSWORD"], HELPER_TEXT["PASSWORD"]),
  newPasswordConfirm: yup
    .string()
    .required(HELPER_TEXT["REQUIRED_INPUT"])
    .oneOf([yup.ref("newPassword")], HELPER_TEXT["PASSWORD_CONFIRM"]),
});

export const useResetPasswordForm = (
  options?: UseFormProps<ResetPasswordFormDataType>
) => {
  return useForm<ResetPasswordFormDataType>({
    resolver: yupResolver(resetPasswordFormSchema),
    mode: "onChange",
    defaultValues: {
      newPassword: "",
      newPasswordConfirm: "",
    },
    ...options,
  });
};
