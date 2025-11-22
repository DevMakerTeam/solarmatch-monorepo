// 파트너 지원하기 페이지
import RootLayout from "@/components/Layout/root";
import { Button } from "@repo/ui/button";
import { Checkbox } from "@repo/ui/checkbox";
import { FormField } from "@repo/ui/form-field";
import { Input } from "@repo/ui/input";
import { cn, formatNumberInput, formatPhoneNumberKR } from "@repo/utils";
import { PARTNER_REGIONS } from "@repo/types";
import { useApplyPartner } from "./hooks/useApplyForm";
import { FormHelper } from "@repo/ui/form-helper";
import { Controller, FormProvider } from "react-hook-form";
import LogoImage from "./components/LogoImage";
import PartnerAddress from "./components/PartnerAddress";
import { Textarea } from "@repo/ui/textarea";

const ApplyPartnerPage = () => {
  const {
    handleSubmit,
    register,
    errors,
    isValid,
    control,
    toggleServiceAreaValue,
    formMethods,
    uploadLogoImage,
    deleteLogoImage,
    url,
    logoImageId,
    isApplyPending,
  } = useApplyPartner();

  return (
    <RootLayout>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit}>
          <div className="w-full flex flex-col lg:flex-row lg:justify-between layout-padding-y">
            <div className="lg:hidden bold-heading4 text-center mb-[74px]">
              파트너 지원하기
            </div>
            <div className="hidden lg:block bold-heading3 max-w-[140px]">
              파트너 지원하기
            </div>

            <div className="flex flex-col w-full lg:max-w-[65%]">
              {/* 업체이미지 등록 */}
              <LogoImage
                url={url}
                uploadLogoImage={uploadLogoImage}
                deleteLogoImage={deleteLogoImage}
                logoImageId={logoImageId}
              />

              {/* 업체명 , 대표 이름 */}
              <div
                className={cn(
                  "w-full flex flex-col lg:flex-row gap-[20px] lg:gap-[35px] mb-[20px] lg:mb-[15px]",
                  errors.companyName || errors.representativeName
                    ? "lg:items-start"
                    : "lg:items-center"
                )}
              >
                <FormField label="업체명" required>
                  <Controller
                    control={control}
                    name="companyName"
                    render={({ field, formState: { errors } }) => (
                      <FormHelper
                        message={{ error: errors.companyName?.message }}
                      >
                        <Input
                          className="input-size-md"
                          placeholder="업체명을 입력해주세요"
                          {...field}
                        />
                      </FormHelper>
                    )}
                  />
                </FormField>

                <FormField label="대표 이름" required>
                  <Controller
                    control={control}
                    name="representativeName"
                    render={({ field, formState: { errors } }) => (
                      <FormHelper
                        message={{ error: errors.representativeName?.message }}
                      >
                        <Input
                          className="input-size-md"
                          placeholder="대표 이름을 입력해주세요"
                          {...field}
                        />
                      </FormHelper>
                    )}
                  />
                </FormField>
              </div>

              <FormField
                label="업체 대표 전화"
                className="mb-[20px] lg:mb-[15px]"
                required
              >
                <Controller
                  control={control}
                  name="phone"
                  render={({ field, formState: { errors } }) => (
                    <FormHelper message={{ error: errors.phone?.message }}>
                      <Input
                        className="input-size-md"
                        placeholder="업체 대표 전화를 입력해주세요"
                        maxLength={13}
                        {...{
                          ...field,
                          value: field.value ?? "",
                          onChange: event => {
                            const formattedValue = formatPhoneNumberKR(
                              event.target.value
                            );

                            field.onChange(formattedValue);
                          },
                        }}
                      />
                    </FormHelper>
                  )}
                />
              </FormField>

              <FormField
                label="업체 이메일"
                className="mb-[20px] lg:mb-[15px]"
                required
              >
                <Controller
                  control={control}
                  name="companyEmail"
                  render={({ field, formState: { errors } }) => (
                    <FormHelper
                      message={{ error: errors.companyEmail?.message }}
                    >
                      <Input
                        className="input-size-md"
                        placeholder="업체 이메일을 입력해주세요"
                        {...field}
                      />
                    </FormHelper>
                  )}
                />
              </FormField>

              {/* 업체 주소 */}
              <PartnerAddress />

              {/* 업체 소개글 */}
              <FormField label="업체 소개글" className="mb-[20px] lg:mb-[15px]">
                <Textarea
                  placeholder="업체 소개글을 입력해주세요"
                  className="w-full h-[123px] lg:h-[118px]"
                  {...register("companyIntroduction")}
                />
              </FormField>

              {/* 활동 경력 */}
              <FormField
                label="활동 경력"
                className="mb-[20px] lg:mb-[15px]"
                required
              >
                <div className="w-full flex flex-col">
                  <Controller
                    control={control}
                    name="experienceYears"
                    render={({ field, formState: { errors } }) => (
                      <FormHelper
                        message={{ error: errors.experienceYears?.message }}
                      >
                        <div className="flex items-center gap-[20px]">
                          <Input
                            placeholder="(년 단위) 경력 기간을 입력해 주세요."
                            className="input-size-md"
                            {...formatNumberInput({
                              ...field,
                              value: field.value ?? "",
                            })}
                          />
                          <p className="bold-body">년</p>
                        </div>
                      </FormHelper>
                    )}
                  />
                </div>
              </FormField>

              {/* 활동 가능지역 */}
              <FormField
                label="활동 가능지역(최대 3개)"
                required
                className="mb-[30px] lg:mb-[50px]"
              >
                <div className="flex flex-col">
                  <Controller
                    control={control}
                    name="serviceAreas"
                    render={({ field, formState }) => {
                      const value = field.value ?? [];
                      return (
                        <FormHelper
                          message={{
                            error: formState.errors.serviceAreas?.message,
                          }}
                        >
                          <div className="grid grid-cols-3 lg:grid-cols-4 gap-[10px] lg:gap-[12px]">
                            {PARTNER_REGIONS.map(region => {
                              const selected = value.includes(region);
                              const isDisabled = !selected && value.length >= 3;
                              return (
                                <Button
                                  type="button"
                                  variant={selected ? "solid" : "outline"}
                                  key={region}
                                  onClick={() =>
                                    field.onChange(
                                      toggleServiceAreaValue(value, region)
                                    )
                                  }
                                  disabled={isDisabled}
                                  className={cn(
                                    "button-size-md lg:button-size-lg",
                                    !selected &&
                                      "hover:bg-white hover:text-primary"
                                  )}
                                >
                                  {region}
                                </Button>
                              );
                            })}
                          </div>
                        </FormHelper>
                      );
                    }}
                  />
                </div>
              </FormField>

              {/* 개인정보수집 및 이용 동의 */}
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

                  <Button
                    type="button"
                    variant="ghost"
                    className="regular-body"
                  >
                    보기
                  </Button>
                </div>
              </div>

              {/* 지원하기 버튼 */}
              <Button
                type="submit"
                className="button-size-xl"
                disabled={!isValid}
                isLoading={isApplyPending}
              >
                지원하기
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </RootLayout>
  );
};

export default ApplyPartnerPage;
