import { yupResolver } from "@hookform/resolvers/yup";
import { HELPER_TEXT } from "@repo/constants";
import { Resolver, useForm, UseFormProps } from "react-hook-form";
import * as yup from "yup";

const compareQuotesFormSchema = yup.object().shape({
  // 설치 방식
  installationType: yup.string().required(),
  // 구조 타입
  structureType: yup.string().required(),
  // 기본 주소
  baseAddress: yup.string().required(HELPER_TEXT.REQUIRED_INPUT),
  // 상세 주소
  detailAddress: yup.string().required(HELPER_TEXT.REQUIRED_INPUT),
  // 현재 한전 용량 (kw, 소수점 3자리)
  currentCapacity: yup
    .number()
    .min(0, HELPER_TEXT.NUMBER_MIN)
    .required(HELPER_TEXT.REQUIRED_INPUT),
  // 설치 예정 용량 (kw, 소수점 3자리)
  plannedCapacity: yup
    .number()
    .min(0, HELPER_TEXT.NUMBER_MIN)
    .required(HELPER_TEXT.REQUIRED_INPUT),
  // 월평균 사용량 (kw, 소수점 3자리)
  monthlyAverageUsage: yup
    .number()
    .min(0, HELPER_TEXT.NUMBER_MIN)
    .required(HELPER_TEXT.REQUIRED_INPUT),
  // 기타 요청사항 (자유 텍스트)
  otherRequests: yup.string().optional(),
  // 이미지 배열 (선택)
  imageIds: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number().required(),
        url: yup.string().required(),
        fileName: yup.string().required(),
        fileSize: yup.number().required(),
      })
    )
    .optional(),
});

export type CompareQuotesFormType = yup.InferType<
  typeof compareQuotesFormSchema
>;

export const useCompareQuotesForm = (
  options?: Omit<UseFormProps<CompareQuotesFormType>, "resolver">
) => {
  return useForm<CompareQuotesFormType>({
    resolver: yupResolver(
      compareQuotesFormSchema
    ) as unknown as Resolver<CompareQuotesFormType>,
    mode: "onChange",
    ...options,
  });
};
