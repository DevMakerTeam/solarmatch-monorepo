import { GetQuotesModel } from "@/api/quote/types/model/get-quotes-model";
import Link from "next/link";
import dayjs from "dayjs";
import { useMemo } from "react";
import { QUOTE_STATUS } from "@repo/types";
import { cn } from "@repo/utils";

interface BiddingItemProps {
  itemData: GetQuotesModel["data"]["data"][number];
}

const BiddingItem = ({ itemData }: BiddingItemProps) => {
  const {
    structureType,
    structureTypeLabel,
    createdAt,
    id,
    remainingHours,
    statusLabel,
    baseAddress,
    plannedCapacity,
    status,
  } = itemData;

  const statusColor = useMemo(() => {
    if (status === QUOTE_STATUS.WAITING) return "bg-green";
    if (status === QUOTE_STATUS.COMPLETED) return "bg-secondary";

    return "bg-cancel";
  }, [status]);

  const isRemainingHours =
    remainingHours > 0 && status !== QUOTE_STATUS.COMPLETED;

  return (
    <Link href={`/bidding/${structureType}/${id}`} prefetch={true}>
      <div className="w-full flex justify-between gap-[50px] lg:items-center pt-[20px] lg:pt-[16px] pb-[20px] lg:pb-[16px] border-b-1 border-border-color hover:bg-light-primary">
        {/* 제목 / 남은시간 */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-[10px] lg:gap-[16px]">
          <span className="bold-caption lg:bold-body max-w-[380px]">
            {`${baseAddress} ${structureTypeLabel} ${plannedCapacity}kw`}
          </span>

          {isRemainingHours && (
            <span className="regular-small text-cancel font-bold">{`${remainingHours}시간 남음`}</span>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-[12px] lg:gap-[16px] items-center">
          {/* 입찰상태 */}
          <div
            className={cn(
              "order-1 lg:order-2 w-[76px] lg:w-[102px] h-[24px] lg:h-[30px] rounded-[4px] text-white bold-small whitespace-nowrap flex items-center justify-center",
              statusColor
            )}
          >
            <span className={cn("regular-small font-bold")}>{statusLabel}</span>
          </div>

          {/* 날짜 */}
          <span className="order-2 lg:order-1 regular-small font-bold">
            {dayjs(createdAt).format("YYYY-MM-DD")}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BiddingItem;
