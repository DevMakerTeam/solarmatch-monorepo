import { OrderType } from "@/constants";
import { Icon } from "@repo/ui/icon";
import Link from "next/link";

interface BackToListButtonProps {
  type: OrderType;
  install: string;
  page: string;
}

const BackToListButton = ({ install, page, type }: BackToListButtonProps) => {
  return (
    <Link
      href={`/orders/${type}?install=${install}${page !== "1" ? `&page=${page}` : ""}`}
    >
      <div className="flex items-center gap-[18px] mb-[24px] lg:mb-[32px] w-fit">
        <Icon
          iconName="chevronLeft"
          className="w-[7px] h-[12px] text-deep-gray"
        />

        <span className="medium-bod">목록으로</span>
      </div>
    </Link>
  );
};

export default BackToListButton;
