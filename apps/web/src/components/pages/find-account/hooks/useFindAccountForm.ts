import { FindAccountDto } from "@/api/auth/types/dto/find-account-dto";
import { yupResolver } from "@hookform/resolvers/yup";
import { HELPER_TEXT, REGEX } from "@repo/constants";
import { FieldValues, useForm, UseFormProps } from "react-hook-form";
import * as yup from "yup";

export interface FindAccountFormDataType extends FindAccountDto, FieldValues {
  smsVerifyCode: string;
}

export const findAccountFormSchema = yup.object().shape({
  name: yup
    .string()
    .required(HELPER_TEXT["REQUIRED_INPUT"])
    .matches(REGEX["NAME"], HELPER_TEXT["NAME"])
    .min(2, HELPER_TEXT["NAME_LENGTH_MIN"])
    .max(4, HELPER_TEXT["NAME_LENGTH_MAX"]),
  phoneNumber: yup
    .string()
    .required(HELPER_TEXT.REQUIRED_INPUT)
    .matches(REGEX["PHONE"], HELPER_TEXT["PHONE"]),
  smsVerifyCode: yup
    .string()
    .required(HELPER_TEXT["REQUIRED_INPUT"])
    .min(6, HELPER_TEXT["SMS_VERIFICATION_CODE_LENGTH"]),
});

export const useFindAccountForm = (
  options?: UseFormProps<FindAccountFormDataType>
) => {
  return useForm<FindAccountFormDataType>({
    resolver: yupResolver(findAccountFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      phoneNumber: "",
      smsVerifyCode: "",
    },
    ...options,
  });
};
