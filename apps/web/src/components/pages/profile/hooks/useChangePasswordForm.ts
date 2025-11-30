import { yupResolver } from "@hookform/resolvers/yup";
import { HELPER_TEXT, REGEX } from "@repo/constants";
import { useForm, UseFormProps } from "react-hook-form";
import * as yup from "yup";

export const changePasswordFormSchema = yup.object().shape({
  currentPassword: yup.string().required(HELPER_TEXT.REQUIRED_INPUT),
  newPassword: yup
    .string()
    .required(HELPER_TEXT.REQUIRED_INPUT)
    .matches(REGEX["PASSWORD"], HELPER_TEXT["PASSWORD"]),
  newPasswordConfirm: yup
    .string()
    .required(HELPER_TEXT["REQUIRED_INPUT"])
    .oneOf([yup.ref("newPassword")], HELPER_TEXT["PASSWORD_CONFIRM"]),
});

export type ChangePasswordFormDataType = yup.InferType<
  typeof changePasswordFormSchema
>;

export const useChangePasswordForm = (
  options?: UseFormProps<ChangePasswordFormDataType>
) => {
  return useForm<ChangePasswordFormDataType>({
    resolver: yupResolver(changePasswordFormSchema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
    ...options,
  });
};
