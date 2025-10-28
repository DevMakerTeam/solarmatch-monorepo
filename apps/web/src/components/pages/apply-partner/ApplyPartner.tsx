// 파트너 지원하기 페이지

import RootLayout from "@/components/Layout/root";
import { Button } from "@repo/ui/button";
import { Checkbox } from "@repo/ui/checkbox";
import { FormField } from "@repo/ui/form-field";
import { Input } from "@repo/ui/input";
import { cn } from "@repo/utils";
import { useApplyPartnerForm } from "./hooks/useApplyPartnerForm";

const REGIONS = [
  "전국",
  "강원",
  "서울/경기",
  "경남",
  "경북",
  "광주광역시",
  "대구광역시",
  "대전광역시",
  "부산광역시",
  "울산광역시",
  "인천광역시",
  "전남",
  "전북",
  "제주",
  "충남",
  "충북",
];

const ApplyPartnerPage = () => {
  const {
    register,
    handleSubmit,
    errors,
    toggleRegion,
    isRegionSelected,
    isValid,
    selectedRegions,
  } = useApplyPartnerForm();

  return (
    <RootLayout footer={null}>
      <form onSubmit={handleSubmit}>
        <div className="w-full flex flex-col lg:flex-row lg:justify-between layout-padding-y">
          <div className="lg:hidden bold-heading4 text-center mb-[74px]">
            파트너 지원하기
          </div>
          <div className="hidden lg:block bold-heading3 max-w-[140px]">
            파트너 지원하기
          </div>

          <div className="flex flex-col w-full lg:max-w-[65%]">
            <FormField label="활동 경력" required className="mb-[40px]">
              <div className="w-full flex flex-col">
                <div className="flex items-center gap-[20px]">
                  <Input
                    type="number"
                    placeholder="(년 단위) 경력 기간을 입력해 주세요."
                    className="input-size-md"
                    {...register("experience")}
                  />
                  <p className="bold-body">년</p>
                </div>
                {errors.experience && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.experience.message}
                  </p>
                )}
              </div>
            </FormField>

            <FormField
              label="활동 가능지역(최대 3개)"
              required
              className="mb-[30px] lg:mb-[50px]"
            >
              <div className="flex flex-col">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[10px] lg:gap-[12px]">
                  {REGIONS.map(region => {
                    const selected = isRegionSelected(region);
                    const isDisabled =
                      !selected && (selectedRegions?.length ?? 0) >= 3;

                    return (
                      <Button
                        type="button"
                        variant={selected ? "solid" : "outline"}
                        key={region}
                        onClick={() => toggleRegion(region)}
                        disabled={isDisabled}
                        className={cn(
                          "button-size-md lg:button-size-lg",
                          !selected && "hover:bg-white hover:text-primary"
                        )}
                      >
                        {region}
                      </Button>
                    );
                  })}
                </div>
                {errors.regions && (
                  <p className="text-red-500  mt-2">{errors.regions.message}</p>
                )}
              </div>
            </FormField>

            <div className="w-full flex flex-col gap-[10px] mb-[25px]">
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-[16px]">
                  <Checkbox
                    id="agreePrivacy"
                    {...register("agreePrivacy")}
                    aria-invalid={!!errors.agreePrivacy}
                    aria-describedby={
                      errors.agreePrivacy ? "agreePrivacy-error" : undefined
                    }
                  />
                  <label
                    htmlFor="agreePrivacy"
                    className="medium-body cursor-pointer"
                  >
                    <span>개인정보수집 및 이용 동의&nbsp;</span>
                    <span className="text-middle-gray">(필수)</span>
                  </label>
                </div>

                <Button type="button" variant="ghost" className="regular-body">
                  보기
                </Button>
              </div>

              {errors.agreePrivacy && (
                <p
                  id="agreePrivacy-error"
                  role="alert"
                  className="text-red-500 text-sm"
                >
                  {errors.agreePrivacy.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="button-size-xl"
              disabled={!isValid}
            >
              지원하기
            </Button>
          </div>
        </div>
      </form>
    </RootLayout>
  );
};

export default ApplyPartnerPage;
