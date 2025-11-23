import { APPLY_STATUS, PartnerInfoType } from "@repo/types";
import { Button } from "@repo/ui/button";
import { Icon } from "@repo/ui/icon";
import { Input } from "@repo/ui/input";
import { BasicOption, Select } from "@repo/ui/select";
import { Textarea } from "@repo/ui/textarea";
import { cn, formatPhoneNumberKR } from "@repo/utils";
import Image from "next/image";
import { ReactNode, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { UserDetailFormDataType } from "../hooks/useUserDetailForm";
import { FormHelper } from "@repo/ui/form-helper";
import { DEFAULT_LOGO_URL } from "@repo/constants";

interface PartnerInfoProps {
  partnerInfo?: PartnerInfoType;
  uploadLogoImage: (file: File) => void;
  deleteLogoImage: () => void;
  url: string | undefined;
}

const APPLY_STATUS_OPTIONS: BasicOption[] = APPLY_STATUS.map(status => {
  return {
    value: status,
    label:
      status === "APPROVED"
        ? "승인 완료"
        : status === "PENDING"
          ? "승인 대기"
          : "승인 반려",
  };
});

const PartnerInfo = ({
  partnerInfo,
  uploadLogoImage,
  deleteLogoImage,
  url,
}: PartnerInfoProps) => {
  const { control, watch } = useFormContext<UserDetailFormDataType>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoImageId = watch("logoImageId");

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const file = e.target.files?.[0];
    if (file) {
      uploadLogoImage(file);
      // 같은 파일 재선택 가능하도록 value 초기화
      e.currentTarget.value = "";
    }
  };

  const {
    baseAddress,
    detailAddress,
    logoUrl,
    phone,
    representativeName,
    companyEmail,
    experienceYears,
    serviceAreas,
  } = partnerInfo || {};

  return (
    <div className="flex flex-col gap-[25px] lg:gap-[30px] lg:min-w-[418px]">
      <div className="flex items-center gap-[15px]">
        <div className="w-[px] border-[2px] border-primary h-[24px] lg:h-[32px]" />

        <h2 className="bold-body lg:bold-heading6 text-primary">업체 정보</h2>
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-y-[15px] lg:gap-y-[25px] gap-x-[50px]">
        <PartnerInfoItem
          align="start"
          field="업체 이미지"
          value={
            <div className="flex items-center justify-between gap-[25px]">
              <div className="w-[65px] h-[65px] min-w-[65px] min-h-[65px] lg:w-[95px] lg:h-[95px] lg:min-w-[95px] lg:min-h-[95px] rounded-full overflow-hidden relative flex items-center justify-center bg-border-color">
                {logoImageId === -1 ? (
                  <Image
                    src={DEFAULT_LOGO_URL}
                    alt="partner-logo"
                    fill
                    className="object-cover"
                  />
                ) : url ? (
                  <Image
                    src={url}
                    alt="partner-logo"
                    fill
                    className="object-cover"
                  />
                ) : logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt="partner-logo"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Icon
                    iconName="photo"
                    className="w-[38%] h-[38%] text-white"
                  />
                )}
              </div>

              <div className="flex items-center gap-[15px]">
                <Button
                  variant="ghost"
                  className="underline underline-offset-3 medium-caption"
                  onClick={openFilePicker}
                >
                  사진 수정
                </Button>
                <Button
                  variant="ghost"
                  className="underline underline-offset-3 medium-caption disabled:text-deep-gray disabled:cursor-not-allowed"
                  onClick={deleteLogoImage}
                  disabled={logoImageId === -1}
                >
                  기본 이미지
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.gif,.webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
          }
        />

        <Controller
          control={control}
          name="companyName"
          render={({ field, formState: { errors } }) => (
            <PartnerInfoItem
              field="업체명"
              align={errors.companyName ? "start" : "center"}
              value={
                <FormHelper message={{ error: errors.companyName?.message }}>
                  <Input
                    className="input-size-xs lg:input-size-sm max-w-[280px] lg:min-w-[280px] w-full"
                    placeholder="업체명을 입력해주세요"
                    {...field}
                  />
                </FormHelper>
              }
            />
          )}
        />

        <PartnerInfoItem
          align="start"
          field="업체 소개글"
          value={
            <Controller
              control={control}
              name="companyIntroduction"
              render={({ field, formState: { errors } }) => (
                <FormHelper
                  message={{ error: errors.companyIntroduction?.message }}
                >
                  <Textarea
                    className="h-[76px] lg:h-[94px] lg:min-w-[280px]"
                    placeholder="업체 소개글을 입력해주세요"
                    {...field}
                  />
                </FormHelper>
              )}
            />
          }
        />

        <PartnerInfoItem field="대표 이름" value={representativeName} />
        <PartnerInfoItem
          field="업체 주소"
          value={`${baseAddress} ${detailAddress}`}
          align="start"
          valueClassName="max-w-[244px]"
        />
        <PartnerInfoItem field="업체 이메일" value={companyEmail} />
        <PartnerInfoItem
          field="업체 대표 전화"
          value={phone ? formatPhoneNumberKR(phone) : phone}
        />
        <PartnerInfoItem field="활동 경력" value={`${experienceYears}년`} />
        <PartnerInfoItem
          field="활동 지역"
          value={!!serviceAreas?.length ? serviceAreas.join(", ") : ""}
        />
        <Controller
          control={control}
          name="partnerStatus"
          render={({ field }) => (
            <PartnerInfoItem
              field="가입 승인 여부"
              value={
                <Select
                  type="basic"
                  size="sm"
                  className="max-w-[109px] lg:max-w-[133px]"
                  placeholder="선택"
                  options={APPLY_STATUS_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                />
              }
            />
          )}
        />
      </div>
    </div>
  );
};

export default PartnerInfo;

const PartnerInfoItem = ({
  field,
  value,
  align = "center", // 기본값은 center
  valueClassName,
}: {
  field: string;
  value: string | ReactNode;
  align?: "center" | "start";
  valueClassName?: string;
}) => {
  return (
    <>
      <span
        className={cn(
          "text-primary bold-body text-nowrap",
          align === "start" ? "self-start" : "self-center"
        )}
      >
        {field}
      </span>

      <div
        className={cn(
          "flex",
          align === "start" ? "items-start" : "items-center"
        )}
      >
        {typeof value === "string" ? (
          <span className={cn("bold-body", valueClassName)}>{value}</span>
        ) : (
          value
        )}
      </div>
    </>
  );
};
