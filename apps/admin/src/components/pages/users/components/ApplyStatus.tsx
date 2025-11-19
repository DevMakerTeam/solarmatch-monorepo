import type { ApplyStatus } from "@repo/types";
import { cn } from "@repo/utils";

interface ApplyStatusProps {
  value: ApplyStatus;
}

const ApplyStatus = ({ value }: ApplyStatusProps) => {
  return (
    <div
      className={cn(
        "w-full h-[32px] rounded-[8px] text-white flex items-center justify-center max-w-[82px]",
        value === "APPROVED"
          ? "bg-secondary"
          : value === "PENDING"
            ? "bg-border-color"
            : "bg-cancel"
      )}
    >
      {value === "APPROVED"
        ? "승인 완료"
        : value === "PENDING"
          ? "승인 대기"
          : "승인 반려"}
    </div>
  );
};

export default ApplyStatus;
