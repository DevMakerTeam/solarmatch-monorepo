import { Button } from "@repo/ui/button";
import { Icon } from "@repo/ui/icon";
import { cn } from "@repo/utils";
import { useState } from "react";
import MobileDrawer from "./MobileDrawer";

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 h-[64px] w-full bg-primary lg:hidden flex items-center justify-between px-[16px] z-50"
      )}
    >
      <Button
        variant="ghost"
        onClick={() => (window.location.href = "/")}
        className="w-fit"
        role="link"
        aria-label="관리자 홈페이지"
        icon={
          <Icon iconName="webLogo" className="h-[20px] w-[143px] text-white" />
        }
      />

      <Button
        variant="ghost"
        onClick={() => setIsOpen(true)}
        className="w-fit"
        aria-label="메뉴 열기"
        icon={<Icon iconName="hamburger" className="text-white" />}
      />

      <MobileDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default MobileHeader;
