import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { BasicOption, Select } from "@repo/ui/select";
import { cn } from "@repo/utils";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren, useMemo } from "react";

// 태양광 종류 형태 선택
const SOLAR_TYPE_LABEL_OPTIONS: BasicOption[] = [
  {
    value: "solar_type1",
    label: "주택용 태양광",
  },
  {
    value: "solar_type2",
    label: "상업용 태양광",
  },
  {
    value: "solar_type3",
    label: "산업용 태양광",
  },
  {
    value: "solar_type4",
    label: "농업용 태양광",
  },
];

// 설치 방식 선택
const INSTALL_METHOD_LABEL_OPTIONS: BasicOption[] = [
  {
    value: "install_method1",
    label: "지붕형(기본형)",
  },
  {
    value: "install_method2",
    label: "지상형(독립형)",
  },
  {
    value: "install_method3",
    label: "추적형(트래커)",
  },
  {
    value: "install_method4",
    label: "건물일체형(BIPV)",
  },
];

const BENEFITS_ITEM_LIST = [
  "숨겨진 비용 없는 진짜 견적",
  "시공자재 투명 공개",
  "솔라매치 보증 시공 후 정산 지급",
  "철저한 파트너 자격 검증",
];

export default function StickyAsideForm() {
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
                value="solar_type1"
              />
            </Group>

            <Group label="설치 예정 용량">
              <Input size="md" placeholder="설치 예정 용량을 입력해주세요." />
            </Group>

            <Group label="설치 방식 선택">
              <Select
                type="basic"
                options={INSTALL_METHOD_LABEL_OPTIONS}
                value="install_method1"
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
        <Link href="/compare-quotes">
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
