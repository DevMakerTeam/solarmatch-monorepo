// 신청내역 상세 페이지
import OrdersLayout from "@/components/Layout/orders";
import { ORDER_TYPES, OrderType } from "@/constants";
import { useTestLoginStore } from "@/stores/testLoginStore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import OrdersDetailTop from "./components/OrdersDetailTop";
import OrdersDetailInformation from "./components/OrdersDetailInformation";
import OrdersDetailBidList from "./components/OrdersDetailBidList";
import OrdersDetailBidButton from "./components/OrdersDetailBidButton";

interface OrdersDetailPageProps {
  type: OrderType;
  id: string;
}

const OrdersDetailPage = ({ type, id }: OrdersDetailPageProps) => {
  const { userType } = useTestLoginStore();
  const router = useRouter();

  // 다른 type 페이지들을 미리 prefetch하여 이동 속도 개선
  useEffect(() => {
    const otherTypes = Object.values(ORDER_TYPES).filter(t => t !== type);
    otherTypes.forEach(otherType => {
      router.prefetch(`/orders/${otherType}/${id}`);
    });
  }, [type, id, router]);

  return (
    <OrdersLayout sideType={type} installType="">
      <div className="w-full flex flex-col">
        <OrdersDetailTop />
        <OrdersDetailInformation />
        <OrdersDetailBidList />
        {userType === "partner" && <OrdersDetailBidButton />}
      </div>
    </OrdersLayout>
  );
};

export default OrdersDetailPage;
