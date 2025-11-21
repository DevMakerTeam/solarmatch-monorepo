import { APPLY_STATUS, PartnerInfoType } from "@repo/types";
import { Button } from "@repo/ui/button";
import { Icon } from "@repo/ui/icon";
import { Input } from "@repo/ui/input";
import { BasicOption, Select } from "@repo/ui/select";
import { Textarea } from "@repo/ui/textarea";
import { cn, formatPhoneNumberKR } from "@repo/utils";
import Image from "next/image";
import { ReactNode } from "react";

interface PartnerInfoProps {
  partnerInfo?: PartnerInfoType;
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

const PartnerInfo = ({ partnerInfo }: PartnerInfoProps) => {
  const {
    companyName,
    baseAddress,
    detailAddress,
    logoUrl,
    phone,
    representativeName,
    companyEmail,
    experienceYears,
    serviceAreas,
    companyIntroduction,
    status,
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
                {logoUrl ? (
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
                >
                  사진 수정
                </Button>
                <Button
                  variant="ghost"
                  className="underline underline-offset-3 medium-caption"
                >
                  기본 이미지
                </Button>
              </div>
            </div>
          }
        />
        <PartnerInfoItem
          field="업체명"
          value={
            <Input
              className="input-size-xs lg:input-size-sm max-w-[280px] lg:min-w-[280px] w-full"
              placeholder="업체명을 입력해주세요"
              defaultValue={companyName}
            />
          }
        />
        <PartnerInfoItem
          align="start"
          field="업체 소개글"
          value={
            <Textarea
              className="h-[76px] lg:h-[94px] lg:min-w-[280px]"
              placeholder="업체 소개글을 입력해주세요"
              defaultValue={companyIntroduction}
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
        <PartnerInfoItem
          field="가입 승인 여부"
          value={
            <Select
              type="basic"
              size="sm"
              className="max-w-[109px] lg:max-w-[133px]"
              placeholder="선택"
              options={APPLY_STATUS_OPTIONS}
              value={status}
              onChange={() => {}}
            />
          }
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
