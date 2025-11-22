import { cn } from "@repo/utils";
import { SpinnerProps } from "./types";

const Spinner = ({ size = "md", className, ...props }: SpinnerProps) => {
  const sizeClasses = {
    sm: "w-[16px] h-[16px] border-2",
    md: "w-[24px] h-[24px] border-2",
    lg: "w-[32px] h-[32px] border-[3px]",
  };

  return (
    <div
      className={cn(
        "inline-block rounded-full border-t-transparent animate-spin",
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="로딩 중"
      {...props}
    >
      <span className="sr-only">로딩 중...</span>
    </div>
  );
};

export default Spinner;
