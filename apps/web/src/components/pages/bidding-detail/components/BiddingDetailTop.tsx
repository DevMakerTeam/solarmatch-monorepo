import { QuoteModel } from "@/api/quote/types/model/get-quote-detail-model";
import { isNotNullish, QUOTE_STATUS } from "@repo/types";
import { cn } from "@repo/utils";
import dayjs from "dayjs";
import { useMemo } from "react";

type BiddingDetailTopProps = Partial<
  Pick<
    QuoteModel,
    | "baseAddress"
    | "structureTypeLabel"
    | "plannedCapacity"
    | "remainingHours"
    | "status"
    | "statusLabel"
    | "createdAt"
  >
>;

const BiddingDetailTop = ({
  baseAddress,
  structureTypeLabel,
  plannedCapacity,
  remainingHours,
  status,
  statusLabel,
  createdAt,
}: BiddingDetailTopProps) => {
  const isRemainingHours = isNotNullish(remainingHours) && remainingHours > 0;

  const statusColor = useMemo(() => {
    if (status === QUOTE_STATUS.WAITING) return "bg-green";
    if (status === QUOTE_STATUS.COMPLETED) return "bg-secondary";

    return "bg-cancel";
  }, [status]);

  return (
    <div className="w-full flex flex-col gap-[10px] lg:gap-[13px] mb-[19px] lg:mb-[22px]">
      {/* 날짜 */}
      <div className="flex items-center gap-[14px]">
        <span className="regular-small lg:regular-caption">
          {dayjs(createdAt).format("YYYY-MM-DD")}
        </span>

        {isRemainingHours && (
          <span className="lg:hidden regular-small text-cancel">
            {`${remainingHours}시간 남음`}
          </span>
        )}
      </div>

      {/* 타이틀 */}
      <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-[8px] lg:gap-[75px] pb-[19px] lg:pb-0 border-b-1 border-b-border-color lg:border-b-0">
        <div className="flex items-center gap-[12px] lg:gap-[20px]">
          <span className="bold-body lg:bold-heading4">
            {`${baseAddress} ${structureTypeLabel} ${plannedCapacity}kw`}
          </span>

          {isRemainingHours && (
            <span className="hidden lg:block regular-caption text-cancel">
              {`${remainingHours}시간 남음`}
            </span>
          )}
        </div>

        <div
          className={cn(
            "flex justify-center items-center w-[76px] lg:w-[116px] h-[24px] lg:h-[40px] rounded-[4px] text-nowrap text-white bold-small lg:bold-body",
            statusColor
          )}
        >
          {statusLabel}
        </div>
      </div>
    </div>
  );
};

export default BiddingDetailTop;
