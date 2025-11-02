import { ORDER_TYPE_LABELS, OrderType } from "@/constants";
import { cn } from "@repo/utils";
import Link from "next/link";

interface OrdersNavProps {
  sideType: OrderType;
  installType: string;
}

const OrdersNav = ({ sideType, installType }: OrdersNavProps) => {
  return (
    <nav className="hidden lg:flex flex-col gap-[20px]">
      {Object.entries(ORDER_TYPE_LABELS).map(([type, label]) => (
        <Link
          key={`orders-nav-${type}`}
          href={`/orders/${type}${installType ? `?install=${installType}` : ""}`}
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

export default OrdersNav;
