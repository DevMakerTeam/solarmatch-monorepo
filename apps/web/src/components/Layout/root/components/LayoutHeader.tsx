import HeaderDrawer from "@/components/Layout/root/components/HeaderDrawer";
import { Button } from "@repo/ui/button";
import { Icon } from "@repo/ui/icon";
import { cn } from "@repo/utils";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { useLoginLink } from "../hooks/useLoginLink";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { useLogout } from "@/hooks/useLogout";

export default function LayoutHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { isLoggedIn, userName } = useAuthStatus();
  const { isReady, loginLink } = useLoginLink();
  const { logout, isPending: isLogoutPending } = useLogout();

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 flex justify-between items-center h-[64px] lg:h-[80px] px-[30px] lg:px-[32px] bg-white z-50"
      id="layout-header"
    >
      <Button
        onClick={() => (window.location.href = "/")}
        className="w-fit"
        role="link"
        aria-label="홈페이지"
        variant="ghost"
      >
        <Icon iconName="webLogo" className="h-[20px] w-[174px] text-primary" />
      </Button>

      {/* nav bar(center) */}
      <nav className="hidden lg:flex items-center gap-[34px]">
        <LinkItem href="/" aria-label="홈페이지" isNav>
          홈페이지
        </LinkItem>
        <LinkItem href="/bidding" aria-label="견적확인 페이지" isNav>
          견적확인
        </LinkItem>
        <LinkItem href="/cases" aria-label="시공사례 페이지" isNav>
          시공사례
        </LinkItem>
        <LinkItem href="/support" aria-label="고객센터 페이지" isNav>
          고객센터
        </LinkItem>
      </nav>

      {/* right side */}
      <div className="hidden lg:flex items-center gap-[30px]">
        {isLoggedIn ? (
          <>
            <div className="relative" ref={dropdownRef}>
              <Button
                variant="ghost"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="flex gap-[8px] items-center">
                  <p className="heavy-body">{userName}</p>

                  <Icon
                    iconName="chevronDown"
                    className={cn(
                      "w-[11px] text-black transition-transform",
                      isDropdownOpen && "rotate-180"
                    )}
                  />
                </div>
              </Button>

              {/* 드롭다운 메뉴 */}
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-[10px] w-[92px] bg-white rounded-[8px] shadow-lg border border-border-color overflow-hidden py-[13px] px-[16px]">
                  <Button
                    onClick={() => {
                      router.push("/profile");
                      setIsDropdownOpen(false);
                    }}
                    variant="ghost"
                    className="w-full text-center bold-body text-middle-gray hover:text-black transition-colors"
                  >
                    회원정보
                  </Button>
                  <Button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      logout();
                    }}
                    variant="ghost"
                    disabled={isLogoutPending}
                    className="w-full text-center bold-body text-middle-gray hover:text-black transition-colors"
                  >
                    로그아웃
                  </Button>
                </div>
              )}
            </div>
          </>
        ) : (
          <LinkItem
            href={loginLink}
            aria-label="로그인 페이지"
            isNav={false}
            isRender={isReady}
          >
            로그인
          </LinkItem>
        )}

        {isLoggedIn && (
          <LinkItem
            href="/apply-partner"
            aria-label="파트너 지원 페이지"
            isNav={false}
          >
            <Button className="button-size-md w-[145px]">
              파트너 지원하기
            </Button>
          </LinkItem>
        )}

        {!isLoggedIn && (
          <LinkItem href="/signup" aria-label="회원가입 페이지" isNav={false}>
            회원가입
          </LinkItem>
        )}
      </div>

      <Button
        className="lg:hidden w-fit"
        onClick={() => setIsOpen(true)}
        variant="ghost"
      >
        <Icon iconName="hamburger" className="text-black" />
      </Button>

      <HeaderDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  );
}

interface LinkItemProps extends LinkProps {
  isNav: boolean;
  isRender?: boolean;
}

function LinkItem({
  href,
  isNav,
  children,
  isRender = true,
  ...props
}: PropsWithChildren<LinkItemProps>) {
  return (
    <Link
      href={isRender ? href : "/login"}
      role="link"
      {...props}
      className={cn(
        isNav ? "text-black" : "text-deep-gray",
        "bold-body hover:text-secondary"
      )}
    >
      {children}
    </Link>
  );
}
