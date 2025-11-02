// 신청내역 상세 페이지
import OrdersLayout from "@/components/Layout/orders";
import { OrderType } from "@/constants";
import { useTestLoginStore } from "@/stores/testLoginStore";
import BackToListButton from "./components/BackToListButton";
import OrdersDetailTop from "./components/OrdersDetailTop";
import OrdersDetailInformation from "./components/OrdersDetailInformation";
import OrdersDetailBidList from "./components/OrdersDetailBidList";
import OrdersDetailBidButton from "./components/OrdersDetailBidButton";

interface OrdersDetailPageProps {
  type: OrderType;
  id: string;
  install: string;
  page: string;
}

const OrdersDetailPage = ({ type, install, page }: OrdersDetailPageProps) => {
  const { userType } = useTestLoginStore();

  return (
    <OrdersLayout sideType={type} installType={install}>
      <div className="w-full flex flex-col">
        <BackToListButton install={install} page={page} type={type} />
        <OrdersDetailTop />
        <OrdersDetailInformation />
        <OrdersDetailBidList />
        {userType === "partner" && <OrdersDetailBidButton />}
      </div>
    </OrdersLayout>
  );
};

export default OrdersDetailPage;
