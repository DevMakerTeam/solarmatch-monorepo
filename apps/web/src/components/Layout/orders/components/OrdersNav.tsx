import { ORDER_TYPE_LABELS, OrderType } from "@/constants";
import { cn } from "@repo/utils";
import Link from "next/link";

interface OrdersNavProps {
  sideType: OrderType;
}

const OrdersNav = ({ sideType }: OrdersNavProps) => {
  return (
    <nav className="hidden lg:flex flex-col gap-[20px]">
      {Object.entries(ORDER_TYPE_LABELS).map(([link, label]) => (
        <Link key={`orders-nav-${link}`} href={`/orders/${link}`}>
          <span
            className={cn(
              "bold-heading6",
              sideType === link ? "text-primary" : "text-middle-gray"
            )}
          >
            {label}
          </span>
        </Link>
      ))}
    </nav>
  );
};

export default OrdersNav;
