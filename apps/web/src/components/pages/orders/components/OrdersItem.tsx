import { OrderType } from "@/constants";
import Link from "next/link";

interface OrdersItemProps {
  type: OrderType;
  id: number;
}

const OrdersItem = ({ type, id }: OrdersItemProps) => {
  return (
    <Link href={`/orders/${type}/${id}`} prefetch={true}>
      <div className="w-full flex justify-between lg:items-center pb-[20px] lg:pb-[16px] border-b-1 border-border-color">
        <div className="flex lg:items-center gap-[10px] lg:gap-[16px]">
          <div className="flex flex-col lg:flex-row gap-[12px] lg:gap-[14px]">
            <span className="bold-caption lg:bold-body">
              경상북도 성주군 주택용 3kw
            </span>

            <div className="p-[3px_11.5px] w-fit text-nowrap rounded-[20px] regular-small text-deep-gray border-1 border-border-color">
              캐노피형
            </div>
          </div>

          <span className="regular-small text-cancel">5시간 남음</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-[12px] lg:gap-[16px] items-center">
          <div className="order-1 lg:order-2 w-[76px] lg:w-[102px] h-[24px] lg:h-[30px] rounded-[4px] bg-green text-white bold-small whitespace-nowrap flex items-center justify-center">
            <span className="regular-small">입찰대기</span>
          </div>

          <span className="order-2 lg:order-1 regular-small">2025-09-05</span>
        </div>
      </div>
    </Link>
  );
};

export default OrdersItem;
