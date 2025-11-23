import { SOLAR_INSTALLATION_TYPES } from "@/constants";
import {
  SOLAR_STRUCTURE_TYPE_LABELS,
  SOLAR_STRUCTURE_TYPES,
  SolarStructureType,
} from "@repo/types";

import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { BasicOption, Select } from "@repo/ui/select";
import { cn, isValidDecimalInput3 } from "@repo/utils";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren, useMemo, useState } from "react";

const SOLAR_TYPE_LABEL_OPTIONS: BasicOption[] = Object.entries(
  SOLAR_STRUCTURE_TYPE_LABELS
).map(([value, label]) => {
  return {
    value,
    label,
  };
});

const INSTALL_METHOD_LABEL_OPTIONS: BasicOption[] =
  SOLAR_INSTALLATION_TYPES.map(({ title, value }) => {
    return {
      label: title,
      value,
    };
  });

const BENEFITS_ITEM_LIST = [
  "숨겨진 비용 없는 진짜 견적",
  "시공자재 투명 공개",
  "솔라매치 보증 시공 후 정산 지급",
  "철저한 파트너 자격 검증",
];

export default function StickyAsideForm() {
  // structureType
  const [solarStructureType, setSolarStructureType] =
    useState<SolarStructureType>(SOLAR_STRUCTURE_TYPES.RESIDENTIAL_SOLAR);

  // installationType
  const [installMethod, setInstallMethod] = useState<string>(
    SOLAR_INSTALLATION_TYPES[0].value
  );

  // plannedCapacity
  const [plannedCapacity, setPlannedCapacity] = useState<string>("");

  // query 파라미터 생성 (최적화)
  const compareQuotesQuery = useMemo(() => {
    const params = new URLSearchParams();
    params.set("structureType", solarStructureType);
    params.set("installationType", installMethod);
    if (plannedCapacity) {
      params.set("plannedCapacity", plannedCapacity);
    }
    return params.toString();
  }, [solarStructureType, installMethod, plannedCapacity]);

  return (
    <div className="hidden xl:flex flex-col w-full max-w-[396px] border border-border-color rounded-[8px] sticky top-[160px] self-start max-h-[calc(100vh-180px)] overflow-hidden">
      {/* 헤더 - 고정 */}
      <div className="w-full p-[20px_35px] border-b border-border-color flex-shrink-0">
        <p className="bold-heading5">솔라매치 : 투명한 태양광 견적받기</p>
      </div>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="p-[25px_20px] flex flex-col">
          <div className="flex flex-col gap-[24px]">
            <Group label="태양광 종류 형태 선택">
              <Select
                type="basic"
                options={SOLAR_TYPE_LABEL_OPTIONS}
                value={solarStructureType}
                onChange={value =>
                  setSolarStructureType(value as SolarStructureType)
                }
              />
            </Group>

            <Group label="설치 예정 용량">
              <Input
                placeholder="설치 예정 용량을 입력해주세요."
                className="input-size-md"
                type="number"
                step="0.001"
                value={plannedCapacity}
                onChange={e => {
                  const value = e.target.value;
                  if (isValidDecimalInput3(value)) {
                    setPlannedCapacity(value);
                  }
                }}
              />
            </Group>

            <Group label="설치 방식 선택">
              <Select
                type="basic"
                options={INSTALL_METHOD_LABEL_OPTIONS}
                value={installMethod}
                onChange={value => setInstallMethod(value)}
              />
            </Group>
          </div>

          <div className="mt-[16px] medium-small">
            <p>*슬레이트/기와/샌드위치패널/옥상 등 지붕 위 설치</p>
            <p>가장 저렴하고 보편적인 방식</p>
          </div>

          <Group label="솔라매치 혜택" className="gap-[25px] mt-[30px]">
            <div className="flex flex-col w-full gap-[8px]">
              {BENEFITS_ITEM_LIST.map(benefit => (
                <BenefitsItem key={benefit} benefit={benefit} />
              ))}
            </div>
          </Group>
        </div>
      </div>

      {/* 버튼 - 고정 */}
      <div className="p-[25px_20px_30px] flex-shrink-0">
        <Link href={`/compare-quotes?${compareQuotesQuery}`} className="block">
          <Button className="w-full button-size-xl">
            실시간 비교 견적 받아보기
          </Button>
        </Link>
      </div>
    </div>
  );
}

function Group({
  label,
  className,
  children,
}: PropsWithChildren<{ label: string; className?: string }>) {
  return (
    <div className={cn("flex flex-col gap-[12px]", className)}>
      <label className="bold-body">{label}</label>
      {children}
    </div>
  );
}

interface BenefitsItemProps {
  benefit: string;
}

function BenefitsItem({ benefit }: BenefitsItemProps) {
  const imageProperty = useMemo(() => {
    switch (benefit) {
      case BENEFITS_ITEM_LIST[1]:
        return {
          imageLabel: "시공자재 투명 공개",
          src: "/images/main/main-color-shield.png",
          alt: "shield",
        };
      case BENEFITS_ITEM_LIST[2]:
        return {
          imageLabel: "솔라매치 보증 시공 후 정산 지급",
          src: "/images/main/main-color-check.png",
          alt: "check",
        };
      case BENEFITS_ITEM_LIST[3]:
        return {
          imageLabel: "철저한 파트너 자격 검증",
          src: "/images/main/main-color-lock.png",
          alt: "lock",
        };
      default:
        return {
          imageLabel: "숨겨진 비용 없는 진짜 견적",
          src: "/images/main/main-color-coin.png",
          alt: "coin",
        };
    }
  }, [benefit]);

  return (
    <div className="flex items-center gap-[15px]">
      <div className="w-[30px] h-[30px] relative">
        <Image
          src={imageProperty.src}
          alt={imageProperty.alt}
          fill
          className="object-cover"
        />
      </div>
      <p className="bold-body">{imageProperty.imageLabel}</p>
    </div>
  );
}
