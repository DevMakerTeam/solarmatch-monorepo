import HeaderDrawerItem, {
  HeaderDrawerItemProps,
} from "@/components/Layout/root/components/HeaderDrawerItem";
import { Drawer } from "@repo/ui";
import { Button } from "@repo/ui/button";
import { Icon } from "@repo/ui/icon";
import { cn, getCurrentBreakpoint } from "@repo/utils";
import { useEffect } from "react";
import { useLoginLink } from "../hooks/useLoginLink";
import Link from "next/link";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { useLogout } from "@/hooks/useLogout";

interface HeaderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const DrawerItemData: Omit<HeaderDrawerItemProps, "onClose">[] = [
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
    text: "견적확인",
  },
  {
    userOnly: false,
    icon: "article",
    link: "/cases",
    text: "시공사례",
  },
  {
    userOnly: false,
    icon: "headphones",
    link: "/support",
    text: "고객센터",
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

// xl 브레이크포인트에서 drawer 자동 닫기 훅
const useCloseOnDesktop = (isOpen: boolean, onClose: () => void) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleResize = () => {
      if (getCurrentBreakpoint() === "desktop") {
        onClose();
      }
    };

    // 초기 체크
    handleResize();

    // resize 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, onClose]);
};

export default function HeaderDrawer({ isOpen, onClose }: HeaderDrawerProps) {
  // xl 브레이크포인트에서 자동 닫기
  useCloseOnDesktop(isOpen, onClose);

  const { loginLink, isReady } = useLoginLink();
  const { isLoggedIn, isLoading, user } = useAuthStatus();
  const { logout, isPending: isLogoutPending } = useLogout();

  const visibleItems = DrawerItemData.filter(
    item => !item.userOnly || isLoggedIn
  );

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
      <div className="w-full h-full flex flex-col">
        {/* 고정 헤더 */}
        <div className="flex-shrink-0 w-full h-[64px] flex items-center justify-between text-primary px-[30px]">
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

        {/* 스크롤 가능한 컨텐츠 영역 */}
        <div className="flex-1 overflow-y-auto px-[30px]">
          {!isLoading && !isLoggedIn && (
            <div className="w-full mt-[42px] flex flex-col gap-[20px] mb-[34px]">
              <p className="bold-heading5">로그인 후 이용해보세요.</p>

              <div className="flex items-center gap-[10px]">
                <Link href="/signup" className="w-full">
                  <Button variant="outline" className="button-size-lg w-full">
                    회원가입
                  </Button>
                </Link>

                <Link href={isReady ? loginLink : "/login"} className="w-full">
                  <Button variant="solid" className="button-size-lg w-full">
                    로그인
                  </Button>
                </Link>
              </div>
            </div>
          )}
          <div
            className={cn(
              "border-b-1 border-border-color",
              isLoggedIn && !isLoading && "mt-[16px]"
            )}
          ></div>

          <div className="flex flex-col">
            {visibleItems.map(item => (
              <HeaderDrawerItem
                key={item.text}
                onClose={onClose}
                {...item}
                onAction={
                  item.text === "로그아웃"
                    ? () => {
                        logout();
                        onClose();
                      }
                    : undefined
                }
                disabled={isLogoutPending && item.text === "로그아웃"}
              />
            ))}
          </div>

          {isLoggedIn && !isLoading && (
            <Button
              className="mt-[42px] mb-[30px] button-size-lg"
              onClick={onClose}
            >
              파트너 지원하기
            </Button>
          )}
        </div>
      </div>
    </Drawer>
  );
}
