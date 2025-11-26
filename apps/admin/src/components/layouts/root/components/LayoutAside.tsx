import { Button } from "@repo/ui/button";
import { Icon } from "@repo/ui/icon";
import { cn } from "@repo/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { LINKS, NavItem } from "../constants";

const LayoutAside = () => {
  const router = useRouter();
  const currentPath = router.asPath.split("?")[0];
  const isBiddingRoute =
    currentPath === "/bidding" || currentPath.startsWith("/bidding/");

  // bidding 링크에 쿼리 파라미터 추가
  const getBiddingLinkWithQuery = (link: string) => {
    if (!link.startsWith("/bidding/") || !isBiddingRoute) {
      return link;
    }

    // page는 제외하고 나머지 쿼리 파라미터 유지
    const queryParams = new URLSearchParams();
    Object.entries(router.query).forEach(([key, value]) => {
      if (key !== "page" && value) {
        if (Array.isArray(value)) {
          value.forEach(v => queryParams.append(key, String(v)));
        } else {
          queryParams.append(key, String(value));
        }
      }
    });

    const queryString = queryParams.toString();
    return queryString ? `${link}?${queryString}` : link;
  };

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
    <div
      className={cn(
        "hidden lg:block fixed top-0 left-0 w-[260px] bg-primary min-h-screen pt-[57px] px-[43px]"
      )}
    >
      <Button
        variant="ghost"
        onClick={() => (window.location.href = "/")}
        role="link"
        aria-label="관리자 홈페이지"
        icon={
          <Icon
            iconName="webLogo"
            className="w-[174px] h-[20px] text-white mb-[75px]"
          />
        }
      />

      <nav className="flex flex-col gap-y-[14px] text-white">
        {LINKS.map(item => {
          const hasChildren = Boolean(item.links?.length);
          const isActive = isParentActive(item);

          if (hasChildren) {
            return (
              <div key={item.link} className="flex flex-col gap-y-[14px]">
                <Link
                  href={getBiddingLinkWithQuery(item.link)}
                  className={cn(
                    "bold-heading6 transition-colors",
                    isActive
                      ? "text-white"
                      : "text-white/60 hover:text-white/90"
                  )}
                >
                  {item.text}
                </Link>

                {isBiddingRoute && (
                  <ul className="flex flex-col gap-y-[14px] pl-3 text-sm text-white/80">
                    {item.links!.map(child => (
                      <li key={child.link}>
                        <Link
                          href={getBiddingLinkWithQuery(child.link)}
                          className={cn(
                            "transition-colors",
                            currentPath === child.link
                              ? "text-white bold-body"
                              : "text-white/60 hover:text-white bold-body"
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
            <Link
              key={item.link}
              href={item.link}
              className={cn(
                "bold-heading6 transition-colors",
                currentPath === item.link
                  ? "text-white"
                  : "text-white/60 hover:text-white/90"
              )}
            >
              {item.text}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default LayoutAside;
