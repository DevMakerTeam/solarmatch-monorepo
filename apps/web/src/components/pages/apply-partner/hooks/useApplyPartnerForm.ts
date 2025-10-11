import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// Validation 스키마
const schema = yup.object({
  experience: yup
    .number()
    .required("활동 경력을 입력해 주세요")
    .positive("경력은 0보다 커야 합니다")
    .integer("경력은 정수로 입력해 주세요")
    .typeError("숫자를 입력해 주세요"),
  regions: yup
    .array()
    .of(yup.string().required())
    .min(1, "최소 1개의 지역을 선택해 주세요")
    .max(3, "최대 3개까지 선택 가능합니다")
    .required("활동 가능지역을 선택해 주세요"),
  agreePrivacy: yup
    .boolean()
    .oneOf([true], "개인정보 수집 및 이용에 동의해 주세요")
    .required("개인정보 수집 및 이용에 동의해 주세요"),
});

// Form 데이터 타입
export type ApplyPartnerFormData = yup.InferType<typeof schema>;

export function useApplyPartnerForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<ApplyPartnerFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      experience: undefined,
      regions: [],
      agreePrivacy: false,
    },
  });

  const selectedRegions = watch("regions");

  // 지역 토글 함수
  const toggleRegion = (region: string) => {
    const currentRegions = selectedRegions || [];

    if (currentRegions.includes(region)) {
      // 이미 선택된 경우 제거
      setValue(
        "regions",
        currentRegions.filter(r => r !== region),
        {
          shouldValidate: true,
        }
      );
    } else {
      // 선택되지 않은 경우 추가 (최대 3개까지)
      if (currentRegions.length < 3) {
        setValue("regions", [...currentRegions, region], {
          shouldValidate: true,
        });
      }
    }
  };

  // 지역 선택 여부 확인
  const isRegionSelected = (region: string) => {
    return selectedRegions?.includes(region) || false;
  };

  const onSubmit = (data: ApplyPartnerFormData) => {
    console.log("Form submitted:", data);
    // TODO: API 호출 로직 추가
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    selectedRegions,
    toggleRegion,
    isRegionSelected,
    isValid,
  };
}
