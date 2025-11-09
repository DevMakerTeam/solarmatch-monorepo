import { Drawer } from "@repo/ui";
import { Button } from "@repo/ui/button";
import { Icon } from "@repo/ui/icon";
import { cn } from "@repo/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LINKS, NavItem } from "../constants";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ICON_MAP: Record<string, Parameters<typeof Icon>[0]["iconName"]> = {
  "/users": "person",
  "/bidding": "article",
  "/support": "headphones",
  "/contracts": "editNote",
};

const MobileDrawer = ({ isOpen, onClose }: MobileDrawerProps) => {
  const router = useRouter();
  const currentPath = router.asPath.split("?")[0];
  const isBiddingRoute =
    currentPath === "/bidding" || currentPath.startsWith("/bidding/");
  const isHomeActive = currentPath === "/";

  const [isBiddingExpanded, setIsBiddingExpanded] = useState(isBiddingRoute);

  useEffect(() => {
    setIsBiddingExpanded(isBiddingRoute);
  }, [isBiddingRoute]);

  const isParentActive = (item: NavItem) => {
    if (currentPath === item.link) {
      return true;
    }

    if (item.links) {
      return item.links.some(child => currentPath === child.link);
    }

    return false;
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      position="right"
      widthRatio={1}
      responsiveWidthRatio={{
        mobile: 1,
        tablet: 1,
      }}
      animationDuration={150}
      className="bg-primary"
    >
      <div className="w-full h-[64px] flex items-center justify-between px-[16px]">
        <Button
          variant="ghost"
          onClick={() => (window.location.href = "/")}
          className="w-fit"
          role="link"
          aria-label="관리자 홈페이지"
          icon={
            <Icon
              iconName="webLogo"
              className="h-[20px] w-[143px] text-white"
            />
          }
        />

        <Button
          variant="ghost"
          onClick={onClose}
          icon={<Icon iconName="x" className="text-white w-[14px] h-[14px]" />}
        />
      </div>

      <nav className="px-[16px] pt-[20px] pb-[40px] flex flex-col gap-[20px]">
        <div className="border-b border-b-white pb-[14px]">
          <button
            type="button"
            onClick={() => (window.location.href = "/")}
            className="group flex items-center gap-[20px] px-[14px] py-[10px] w-full text-left"
          >
            <Icon
              iconName="home"
              className={cn(
                "w-[24px] h-[24px] transition-colors",
                isHomeActive
                  ? "text-white"
                  : "text-white/60 group-hover:text-white"
              )}
            />
            <span
              className={cn(
                "bold-heading6 transition-colors",
                isHomeActive
                  ? "text-white"
                  : "text-white/60 group-hover:text-white"
              )}
            >
              홈페이지
            </span>
          </button>
        </div>

        {LINKS.map(item => {
          const hasChildren = Boolean(item.links?.length);
          const isActive = isParentActive(item);
          const iconName = ICON_MAP[item.link] ?? "article";

          if (item.link === "/bidding") {
            return (
              <div
                key={item.link}
                className="flex flex-col gap-[14px] border-b border-b-white pb-[14px]"
              >
                <button
                  type="button"
                  onClick={() => setIsBiddingExpanded(prev => !prev)}
                  className="flex items-center gap-[20px] px-[14px] py-[10px] text-left"
                  aria-expanded={isBiddingExpanded}
                  aria-controls="bidding-submenu"
                >
                  <Icon
                    iconName={iconName}
                    className={cn(
                      "w-[24px] h-[24px] transition-colors",
                      isActive ? "text-white" : "text-white/60"
                    )}
                  />
                  <span
                    className={cn(
                      "bold-heading6 transition-colors",
                      isActive ? "text-white" : "text-white/60 hover:text-white"
                    )}
                  >
                    {item.text}
                  </span>
                </button>

                {hasChildren && isBiddingExpanded && (
                  <ul
                    id="bidding-submenu"
                    className="flex flex-col gap-[14px] pl-[58px] text-sm text-white/80"
                  >
                    {item.links!.map(child => (
                      <li key={child.link} onClick={onClose}>
                        <Link
                          href={child.link}
                          className={cn(
                            "transition-colors bold-body",
                            currentPath === child.link
                              ? "text-white"
                              : "text-white/60 hover:text-white"
                          )}
                        >
                          {child.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          }

          return (
            <div
              key={item.link}
              className="flex flex-col gap-[14px] border-b border-b-white pb-[14px]"
            >
              <Link
                href={item.link}
                className="flex items-center gap-[20px] px-[14px] py-[10px]"
              >
                <Icon
                  iconName={iconName}
                  className={cn(
                    "w-[24px] h-[24px] transition-colors",
                    isActive ? "text-white" : "text-white/60"
                  )}
                />
                <span
                  className={cn(
                    "bold-heading6 transition-colors",
                    isActive ? "text-white" : "text-white/60 hover:text-white"
                  )}
                >
                  {item.text}
                </span>
              </Link>

              {hasChildren && isBiddingExpanded && (
                <ul className="flex flex-col gap-[14px] pl-[58px] text-sm text-white/80">
                  {item.links!.map(child => (
                    <li key={child.link} onClick={onClose}>
                      <Link
                        href={child.link}
                        className={cn(
                          "transition-colors bold-body",
                          currentPath === child.link
                            ? "text-white"
                            : "text-white/60 hover:text-white"
                        )}
                      >
                        {child.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </Drawer>
  );
};

export default MobileDrawer;
