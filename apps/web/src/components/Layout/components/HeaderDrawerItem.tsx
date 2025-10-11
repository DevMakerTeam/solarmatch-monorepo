import { Button } from "@repo/ui/button";
import { Icon } from "@repo/ui/icon";
import { cn } from "@repo/utils";
import Link from "next/link";
import { ComponentProps } from "react";

export interface HeaderDrawerItemProps {
  userOnly: boolean;
  icon: ComponentProps<typeof Icon>["iconName"];
  link?: string;
  text: string;
  onClose: () => void;
}

export default function HeaderDrawerItem({
  icon,
  userOnly,
  link,
  text,
  onClose,
}: HeaderDrawerItemProps) {
  const commonStyles =
    "flex items-center justify-start gap-[20px] p-[20px_13px] border-b-1 border-border-color w-full bold-heading6";
  const iconComponent = (
    <Icon iconName={icon} className="w-[24px] h-[24px] text-gray-100" />
  );
  const isLogoutButton = !link && userOnly;

  const handleLogout = () => {
    onClose();
  };

  if (isLogoutButton) {
    return (
      <Button
        variant="ghost"
        className={cn(commonStyles, "w-full h-fit")}
        onClick={handleLogout}
      >
        {iconComponent}
        {text}
      </Button>
    );
  }

  if (link === "/") {
    return (
      <Button
        onClick={() => {
          window.location.href = "/";
          onClose();
        }}
        className={cn(commonStyles, "w-full h-fit")}
        role="link"
        aria-label="홈페이지"
        variant="ghost"
      >
        {iconComponent}
        {text}
      </Button>
    );
  }

  return (
    <Link href={link!} className={cn(commonStyles)} onClick={onClose}>
      {iconComponent}
      {text}
    </Link>
  );
}
