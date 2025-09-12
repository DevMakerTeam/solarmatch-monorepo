import { Button, Drawer, Icon } from "@repo/ui";
import { cn } from "@repo/utils";
import Link from "next/link";
import { ComponentProps } from "react";

interface HeaderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const DrawerItemData: Omit<DrawerItemProps, "onClose">[] = [
  {
    userOnly: false,
    icon: "home",
    link: "/",
    text: "홈페이지",
  },
  {
    userOnly: false,
    icon: "clock",
    link: "/bidding",
    text: "실시간 입찰확인",
  },
  {
    userOnly: false,
    icon: "article",
    link: "/cases",
    text: "설치사례",
  },
  {
    userOnly: false,
    icon: "headphones",
    link: "/support",
    text: "고객센터",
  },
  {
    userOnly: true,
    icon: "checkList",
    link: "/orders",
    text: "신청내역",
  },
  {
    userOnly: true,
    icon: "circlePerson",
    link: "/profile",
    text: "회원정보",
  },
  {
    userOnly: true,
    icon: "logout",
    text: "로그아웃",
  },
];

const isLogin = true;

export default function HeaderDrawer({ isOpen, onClose }: HeaderDrawerProps) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      position="right"
      widthRatio={1}
      responsiveWidthRatio={{
        mobile: 1,
        tablet: 0.45,
      }}
      animationDuration={150}
    >
      <div className="w-full flex flex-col px-[30px]">
        <div className="w-full h-[64px] flex items-center justify-between text-primary">
          <Button
            onClick={() => (window.location.href = "/")}
            className="cursor-pointer"
            role="link"
            aria-label="홈페이지"
            variant="ghost"
          >
            <Icon iconName="webLogo" className="w-[174px] h-[20px]" />
          </Button>

          <Button variant="ghost" className="w-fit" onClick={onClose}>
            <Icon iconName="x" className="text-black w-[16px] h-[16px]" />
          </Button>
        </div>
        {!isLogin && (
          <div className="w-full mt-[42px] flex flex-col gap-[20px] mb-[34px]">
            <p className="bold-heading5">로그인 후 이용해보세요.</p>

            <div className="flex items-center gap-[10px]">
              <Button variant="outline" size="lg">
                회원가입
              </Button>

              <Button variant="solid" size="lg">
                로그인
              </Button>
            </div>
          </div>
        )}
        <div
          className={cn(
            "border-b-1 border-border-color",
            isLogin && "mt-[16px]"
          )}
        ></div>

        <div className="flex flex-col">
          {DrawerItemData.map(item => (
            <DrawerItem key={item.text} onClose={onClose} {...item} />
          ))}
        </div>

        {isLogin && (
          <Button size="lg" className="mt-[42px]" onClick={onClose}>
            파트너 지원하기
          </Button>
        )}
      </div>
    </Drawer>
  );
}

interface DrawerItemProps {
  userOnly: boolean;
  icon: ComponentProps<typeof Icon>["iconName"];
  link?: string;
  text: string;
  onClose: () => void;
}

function DrawerItem({ icon, userOnly, link, text, onClose }: DrawerItemProps) {
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
