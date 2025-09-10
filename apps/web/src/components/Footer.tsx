import { Icon } from "@repo/ui";
import { cn } from "@repo/utils";

export default function Footer() {
  return (
    <div
      className={cn(
        "pl-[44px] lg:pl-[380px]",
        "pt-[28px] lg:pt-[38px]",
        "pb-[60px]",
        "w-full bg-light-gray"
      )}
    >
      {/* mobile */}
      <div className="flex flex-col lg:hidden">
        <Icon iconName="webLogo" />
      </div>

      {/* desktop */}
      <div className="hidden lg:flex">
        <Icon iconName="webLogo" className="w-[174px] h-[20px] text-primary" />
      </div>
    </div>
  );
}
