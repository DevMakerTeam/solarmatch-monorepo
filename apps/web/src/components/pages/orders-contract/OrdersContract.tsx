import OrdersLayout from "@/components/Layout/orders";
import { ORDER_TYPES, OrderType } from "@/constants";
import { useRouter } from "next/router";
import { useEffect } from "react";
import OrdersContractTop from "./components/OrdersContractTop";
import OrdersContractInfo from "./components/OrdersContractInfo";
import { Pagination } from "@repo/ui/pagination";
import OrdersContractInstallList from "./components/OrdersContractInstallList";

interface OrdersContractPageProps {
  type: OrderType;
  id: string;
}

const OrdersContractPage = ({ type, id }: OrdersContractPageProps) => {
  const router = useRouter();

  // 다른 type 페이지들을 미리 prefetch하여 이동 속도 개선
  useEffect(() => {
    const otherTypes = Object.values(ORDER_TYPES).filter(t => t !== type);
    otherTypes.forEach(otherType => {
      router.prefetch(`/orders/${otherType}/${id}/contract`);
    });
  }, [type, id, router]);

  return (
    <OrdersLayout sideType={type}>
      <div className="flex flex-col w-full">
        <OrdersContractTop />
        <OrdersContractInfo />
        <OrdersContractInstallList />
        <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
      </div>
    </OrdersLayout>
  );
};

export default OrdersContractPage;
