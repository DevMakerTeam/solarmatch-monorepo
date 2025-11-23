import { EditUserDto } from "@/api/users/types/dto/edit-user-dto";
import { yupResolver } from "@hookform/resolvers/yup";
import { HELPER_TEXT } from "@repo/constants";
import { APPLY_STATUS, ApplyStatus } from "@repo/types";
import { FieldValues, Resolver, useForm, UseFormProps } from "react-hook-form";
import * as yup from "yup";

export interface UserDetailFormDataType
  extends FieldValues,
    Omit<EditUserDto, "id"> {}

export const userDetailFormSchema = yup.object().shape({
  partnerStatus: yup.mixed<ApplyStatus>().oneOf(APPLY_STATUS).required(),
  companyName: yup.string().required(HELPER_TEXT.REQUIRED_INPUT),
  companyIntroduction: yup.string().optional(),
  logoImageId: yup.number().optional(),
});

export const useUserDetailForm = (
  options?: UseFormProps<UserDetailFormDataType>
) => {
  return useForm<UserDetailFormDataType>({
    resolver: yupResolver(
      userDetailFormSchema
    ) as unknown as Resolver<UserDetailFormDataType>,
    mode: "onChange",
    ...options,
  });
};
