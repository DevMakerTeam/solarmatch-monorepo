import {
  SOLAR_STRUCTURE_TYPE_LABELS,
  SolarStructureType,
} from "@repo/constants";
import { SOLAR_INSTALLATION_TYPES } from "@/constants";
import { cn } from "@repo/utils";
import { useRouter } from "next/router";
import Link from "next/link";
import { useMemo } from "react";

interface BiddingNavProps {
  sideType: SolarStructureType;
}

const BiddingNav = ({ sideType }: BiddingNavProps) => {
  const router = useRouter();

  // install 쿼리스트링 처리 (없으면 첫 번째 값 사용)
  const installType = useMemo(() => {
    const installQuery = router.query.install as string | undefined;
    return installQuery || SOLAR_INSTALLATION_TYPES[0].value;
  }, [router.query.install]);

  return (
    <nav className="hidden lg:flex flex-col gap-[20px]">
      {Object.entries(SOLAR_STRUCTURE_TYPE_LABELS).map(([type, label]) => (
        <Link
          key={`bidding-nav-${type}`}
          href={`/bidding/${type}?install=${installType}`}
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
