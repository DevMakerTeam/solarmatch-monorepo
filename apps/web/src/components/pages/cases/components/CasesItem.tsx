import { ContractCaseItem } from "@repo/types";
import { Icon } from "@repo/ui/icon";
import Image from "next/image";

const CasesItem = ({
  baseAddress,
  detailAddress,
  plannedCapacity,
  representativePhotoUrl,
  title,
}: ContractCaseItem) => {
  return (
    <div className="shadow-[0px_0px_9px_2px_rgba(0,0,0,0.1)] hover:ring-2 hover:ring-border-color ring-offset-0 transition-shadow w-full rounded-[8px] flex lg:flex-col">
      <div className="relative w-full max-w-[107px] aspect-square lg:max-w-none lg:aspect-[254/123] rounded-tl-[8px] rounded-bl-[8px] lg:rounded-br-none lg:rounded-tr-[8px] lg:rounded-bl-none overflow-hidden">
        <Image
          src={representativePhotoUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <div className="py-[10px] lg:py-[20px] px-[16px] lg:px-[20px]">
        <span className="bold-caption lg:bold-body line-clamp-2">{title}</span>

        <div className="flex items-center mt-[13px]">
          <Icon
            iconName="circleLocation"
            className="w-[15.6px] h-[15.6px] min-w-[15.6px] min-h-[15.6px] text-middle-gray"
          />
          <span className="medium-caption ml-[6px] truncate">{`위치 ${baseAddress} ${detailAddress}`}</span>
        </div>

        <div className="flex items-center mt-[7px]">
          <Icon
            iconName="bolt"
            className="w-[15.6px] h-[15.6px] min-w-[15.6px] min-h-[15.6px] text-middle-gray"
          />
          <span className="medium-caption ml-[6px]">{`용량 ${plannedCapacity}kw`}</span>
        </div>
      </div>
    </div>
  );
};

export default CasesItem;
