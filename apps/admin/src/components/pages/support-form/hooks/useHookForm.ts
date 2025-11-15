import { CreateQnaDto } from "@/api/qna/types/dto/create-qna-dto";
import { yupResolver } from "@hookform/resolvers/yup";
import { HELPER_TEXT } from "@repo/constants";
import { FieldValues, useForm, UseFormProps } from "react-hook-form";

import * as yup from "yup";

export interface SupportFormDataType extends CreateQnaDto, FieldValues {}

export const supportFormSchema = yup.object().shape({
  question: yup.string().required(HELPER_TEXT.REQUIRED_INPUT),
  answer: yup.string().required(HELPER_TEXT.REQUIRED_INPUT),
});

export const useHookForm = (options?: UseFormProps<SupportFormDataType>) => {
  return useForm<SupportFormDataType>({
    resolver: yupResolver(supportFormSchema),
    mode: "onChange",
    defaultValues: {
      question: "",
      answer: "",
    },
    ...options,
  });
};
