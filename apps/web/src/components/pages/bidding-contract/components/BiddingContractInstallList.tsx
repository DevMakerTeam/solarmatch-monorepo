import { BidResponse } from "@repo/types";
import { NonData } from "@repo/ui";
import { Icon } from "@repo/ui/icon";
import { cn } from "@repo/utils";
import Image from "next/image";

interface BiddingContractInstallListProps {
  data?: BidResponse;
}

const BiddingContractInstallList = ({
  data,
}: BiddingContractInstallListProps) => {
  if (!data) return null;

  const { contractCases } = data;
  const { data: contractCasesList, total: totalCount } = contractCases || {};

  return (
    <div
      className={cn(
        "w-full mb-[30px] lg:mb-[60px] grid lg:grid-cols-4 grid-cols-1 gap-[20px]",
        !!totalCount
          ? "grid lg:grid-cols-4 grid-cols-1 gap-[20px]"
          : "flex items-center justify-center"
      )}
    >
      {!!totalCount ? (
        contractCasesList.map(item => (
          <div
            className="shadow-[0px_0px_9px_2px_rgba(0,0,0,0.1)] hover:ring-2 hover:ring-border-color ring-offset-0 transition-shadow w-full rounded-[8px] flex lg:flex-col min-w-0"
            key={`order-contract-install-list-${item.contractId}`}
          >
            <div className="relative w-[120px] aspect-square lg:w-full lg:aspect-[254/123] rounded-tl-[8px] rounded-bl-[8px] lg:rounded-br-none lg:rounded-tr-[8px] lg:rounded-bl-none overflow-hidden flex-shrink-0">
              <Image
                src={item.representativePhotoUrl}
                alt="cases"
                fill
                className="object-cover"
              />
            </div>

            <div className="py-[10px] lg:py-[20px] px-[16px] lg:px-[20px] min-w-0 flex-1">
              <span className="bold-caption lg:bold-body">{item.title}</span>

              <div className="flex items-center mt-[13px]">
                <Icon
                  iconName="circleLocation"
                  className="w-[15.6px] h-[15.6px] min-w-[15.6px] min-h-[15.6px] text-middle-gray"
                />
                <span className="medium-caption ml-[6px] truncate">{`위치 ${item.baseAddress} ${item.detailAddress}`}</span>
              </div>

              <div className="flex items-center mt-[7px]">
                <Icon
                  iconName="bolt"
                  className="w-[15.6px] h-[15.6px] min-w-[15.6px] min-h-[15.6px] text-middle-gray"
                />
                <span className="medium-caption ml-[6px]">{`용량 ${item.plannedCapacity}kw`}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <NonData nonDataText="시공 사례가 없습니다." />
      )}
    </div>
  );
};

export default BiddingContractInstallList;
