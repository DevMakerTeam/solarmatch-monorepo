import RootLayout from "@/components/Layout/root";
import { OrderType } from "@/constants";
import { PropsWithChildren } from "react";
import OrdersNav from "./components/OrdersNav";

interface OrdersLayoutProps {
  sideType: OrderType;
  installType: string;
}

const OrdersLayout = ({
  children,
  sideType,
  installType,
}: PropsWithChildren<OrdersLayoutProps>) => {
  return (
    <RootLayout>
      <div className="layout-padding-y flex flex-col lg:flex-row gap-[40px] lg:gap-[120px]">
        <div className="flex flex-col gap-[45px]">
          <span className="bold-heading4 lg:bold-heading3 text-center lg:text-left whitespace-nowrap">
            신청내역
          </span>

          <OrdersNav sideType={sideType} installType={installType} />
        </div>

        {children}
      </div>
    </RootLayout>
  );
};

export default OrdersLayout;
