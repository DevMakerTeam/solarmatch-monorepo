import { cn } from "@repo/utils";
import { Icon } from "../Icon";

interface NonDataProps {
  nonDataText: string;
  className?: string;
}

const NonData = ({ nonDataText, className }: NonDataProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-full h-[350px]",
        className
      )}
    >
      <div className="flex flex-col items-center gap-[10px]">
        <Icon iconName="nonData" className="w-25 h-25 text-middle-gray" />

        <span className="bold-body">{nonDataText}</span>
      </div>
    </div>
  );
};

export default NonData;
