import { useModals } from "@repo/hooks";
import { Icon, IconProps } from "@repo/ui/icon";
import Image from "next/image";
import ImagesModal from "./ImagesModal";

const BidDetailInformation = () => {
  const { open, close } = useModals();

  const onClickOpenImageModal = () => {
    open(ImagesModal, {
      onClose: close,
    });
  };

  return (
    <div className="w-full flex flex-col gap-[10px] mb-[30px] lg:mb-[10px]">
      <InfoGroup
        left={{
          iconName: "circleLocation",
          label: "위치",
          value: "경상북도 성주군",
          labelWidth: "short",
        }}
        right={{
          iconName: "bolt",
          label: "현재 한전 용량",
          value: "99.76kw",
          labelWidth: "long",
        }}
      />

      <InfoGroup
        left={{
          iconName: "bolt",
          label: "용량",
          value: "99.76kw",
          labelWidth: "short",
        }}
        right={{
          iconName: "bolt",
          label: "월평균 사용량",
          value: "99.76kw",
          labelWidth: "long",
        }}
      />

      <InfoGroup
        left={{
          iconName: "article",
          label: "기타",
          value: (
            <div className="w-full max-w-[590px] max-h-[80px] h-full overflow-y-auto thin-scrollbar regular-caption lg:regular-body">
              발전소 대부분은 일반 사업주들의 사업장에 설치되어 있습니다. 상세
              주소를 공개할 수 없습니다. 발전소 대부분은 일반 사업주들의
              사업장에 설치되어 있습니다. 상세 주소를 공개할 수 없습니다. 발전소
              대부분은 일반 사업주들의 사업장에 설치되어 있습니다. 상세 주소를
              공개할 수 없습니다.
            </div>
          ),
          labelWidth: "short",
          itemsAlign: "start",
        }}
        right={{
          iconName: "photoFile",
          label: "첨부파일",
          labelWidth: "long",
          itemsAlign: "start",
          value: (
            <div
              className="group relative w-[143px] h-[95px] cursor-pointer"
              onClick={onClickOpenImageModal}
            >
              <Image
                src="/images/orders-detail/image-1.jpg"
                alt="첨부파일"
                fill
                className="object-cover"
              />

              <div className="absolute right-0 top-0 w-[40px] h-[18px] flex items-center justify-center bg-black/40 text-white medium-small">
                1/10
              </div>

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="flex flex-col items-center gap-[4px] text-white">
                  <Icon iconName="magnifyPlus" className="w-[26px] h-[26px]" />
                  <span className="bold-small">크게보기</span>
                </div>
              </div>
            </div>
          ),
        }}
      />
    </div>
  );
};

export default BidDetailInformation;

interface InfoRowProps {
  iconName: IconProps["iconName"];
  label: string;
  value: string | React.ReactNode;
  labelWidth?: "short" | "long";
  itemsAlign?: "center" | "start";
  fullWidth?: boolean;
}

interface InfoGroupProps {
  left: InfoRowProps;
  right?: InfoRowProps;
}

const InfoRow = ({
  iconName,
  label,
  value,
  labelWidth = "short",
  itemsAlign = "center",
  fullWidth = false,
}: InfoRowProps) => {
  const labelWidthClass =
    labelWidth === "short" ? "lg:w-[64px]" : "lg:w-[128px]";
  const itemsAlignClass =
    itemsAlign === "center" ? "items-center" : "items-start";

  return (
    <div
      className={`flex ${itemsAlignClass} gap-[24px] ${labelWidth === "short" ? "lg:gap-[30px]" : "lg:gap-[17px]"} w-full max-w-full ${!fullWidth && labelWidth === "short" ? "lg:max-w-[470px]" : ""}`}
    >
      <div className={`w-fit ${labelWidthClass} flex gap-[12px] items-center`}>
        <Icon
          iconName={iconName}
          className="w-[24px] h-[24px] text-middle-gray"
        />
        <span className="bold-caption lg:bold-body text-nowrap">{label}</span>
      </div>
      {typeof value === "string" ? (
        <span className="regular-caption lg:regular-body">{value}</span>
      ) : (
        value
      )}
    </div>
  );
};

const InfoGroup = ({ left, right }: InfoGroupProps) => {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-[10px] lg:gap-[70px]">
      <InfoRow {...left} fullWidth={!right} />
      {right && <InfoRow {...right} />}
    </div>
  );
};
