import { ORDER_TYPES, ORDER_TYPE_LABELS, OrderType } from "@/constants";
import { cn } from "@repo/utils";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";

interface BiddingNavProps {
  sideType: OrderType;
  installType?: string;
}

const BiddingNav = ({ sideType, installType }: BiddingNavProps) => {
  const router = useRouter();

  // 마운트 시 모든 type 페이지를 미리 prefetch하여 이동 속도 개선
  useEffect(() => {
    Object.values(ORDER_TYPES).forEach(type => {
      router.prefetch(
        `/bidding/${type}${installType ? `?install=${installType}` : ""}`
      );
    });
  }, [installType, router]);

  return (
    <nav className="hidden lg:flex flex-col gap-[20px]">
      {Object.entries(ORDER_TYPE_LABELS).map(([type, label]) => (
        <Link
          key={`bidding-nav-${type}`}
          href={`/bidding/${type}${installType ? `?install=${installType}` : ""}`}
          prefetch={true}
        >
          <span
            className={cn(
              "bold-heading6",
              sideType === type ? "text-primary" : "text-middle-gray"
            )}
          >
            {label}
          </span>
        </Link>
      ))}
    </nav>
  );
};

export default BiddingNav;
