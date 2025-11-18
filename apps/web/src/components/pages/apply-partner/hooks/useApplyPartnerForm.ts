import { yupResolver } from "@hookform/resolvers/yup";
import { HELPER_TEXT, REGEX } from "@repo/constants";
import { PARTNER_REGIONS, PartnerRegion } from "@repo/types";
import { useForm, UseFormProps, type Resolver } from "react-hook-form";
import * as yup from "yup";

/**
 * @param companyName 업체명
 * @param baseAddress 업체 기본 주소
 * @param detailAddress 업체 상세 주소
 * @param phone 업체 전화번호
 * @param representativeName 대표자 성명
 * @param companyEmail 업체 이메일 주소
 * @param experienceYears 활동경력
 * @param serviceAreas 활동 가능 지역
 * @param logoImageId 로고 이미지 ID
 * @param companyIntroduction 업체 소개글
 */
export const applyPartnerFormSchema = yup.object().shape({
  companyName: yup.string().required(HELPER_TEXT.REQUIRED_INPUT),
  baseAddress: yup.string().required(HELPER_TEXT.REQUIRED_INPUT),
  detailAddress: yup.string().required(HELPER_TEXT.REQUIRED_INPUT),
  phone: yup
    .string()
    .required(HELPER_TEXT["REQUIRED_INPUT"])
    .matches(REGEX["PHONE_ALL"], HELPER_TEXT["PHONE"]),
  representativeName: yup.string().required(HELPER_TEXT.REQUIRED_INPUT),
  companyEmail: yup
    .string()
    .required(HELPER_TEXT.REQUIRED_INPUT)
    .matches(REGEX.EMAIL, HELPER_TEXT.EMAIL),
  experienceYears: yup
    .number()
    .transform((_, originalValue) => {
      // 빈 값이면 undefined 반환 (required 에러)
      if (
        originalValue === "" ||
        originalValue === null ||
        originalValue === undefined
      ) {
        return undefined;
      }
      // 숫자로 변환 시도
      const num = Number(originalValue);
      // NaN이면 NaN 반환 (typeError로 NUMBER 에러)
      if (isNaN(num)) {
        return NaN;
      }
      return num;
    })
    .typeError(HELPER_TEXT.NUMBER)
    .required(HELPER_TEXT.REQUIRED_INPUT)
    .min(0, HELPER_TEXT.NUMBER_MIN),
  serviceAreas: yup
    .array()
    .of(yup.mixed<PartnerRegion>().oneOf(PARTNER_REGIONS).required())
    .min(1, HELPER_TEXT.SERVICE_AREAS_MIN)
    .max(3, HELPER_TEXT.SERVICE_AREAS_MAX)
    .required(HELPER_TEXT.REQUIRED_INPUT),
  logoImageId: yup.number().optional(),
  companyIntroduction: yup.string().optional(),
  agreePrivacy: yup
    .boolean()
    .oneOf([true], HELPER_TEXT.REQUIRED_CHECKBOX)
    .required(HELPER_TEXT.REQUIRED_CHECKBOX),
});

type InferedForm = yup.InferType<typeof applyPartnerFormSchema>;
export type ApplyPartnerFormData = InferedForm;

export function useApplyPartnerForm(
  options?: UseFormProps<ApplyPartnerFormData>
) {
  return useForm<ApplyPartnerFormData>({
    resolver: yupResolver(
      applyPartnerFormSchema
    ) as unknown as Resolver<ApplyPartnerFormData>,
    mode: "onChange",
    defaultValues: {
      experienceYears: undefined,
      serviceAreas: [],
      logoImageId: undefined,
      companyIntroduction: undefined,
      agreePrivacy: false,
      baseAddress: "",
      detailAddress: "",
      phone: "",
      companyEmail: "",
      companyName: "",
      representativeName: "",
    },
    ...options,
  });
}
