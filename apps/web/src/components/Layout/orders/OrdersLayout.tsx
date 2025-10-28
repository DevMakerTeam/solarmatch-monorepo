import MainLayout from "@/components/Layout/root";
import { OrderType } from "@/constants";
import { PropsWithChildren } from "react";
import OrdersNav from "./components/OrdersNav";

interface OrdersLayoutProps {
  sideType: OrderType;
}

const OrdersLayout = ({
  children,
  sideType,
}: PropsWithChildren<OrdersLayoutProps>) => {
  return (
    <MainLayout footer={null}>
      <div className="layout-padding-y flex flex-col lg:flex-row gap-[40px] lg:gap-[120px]">
        <div className="flex flex-col gap-[45px]">
          <span className="bold-heading4 lg:bold-heading3 text-center lg:text-left whitespace-nowrap">
            신청내역
          </span>

          <OrdersNav sideType={sideType} />
        </div>

        {children}
      </div>
    </MainLayout>
  );
};

export default OrdersLayout;
