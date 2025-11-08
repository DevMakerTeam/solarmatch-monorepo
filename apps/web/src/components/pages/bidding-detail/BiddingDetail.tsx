// 견적확인 상세 페이지
import OrdersLayout from "@/components/Layout/bidding";

import { SolarStructureType, SOLAR_STRUCTURE_TYPES } from "@repo/constants";
import { useTestLoginStore } from "@/stores/testLoginStore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import BiddingDetailTop from "./components/BiddingDetailTop";
import BidDetailInformation from "./components/BidDetailInformation";
import BidList from "./components/BidList";
import BidButton from "./components/BidButton";

interface BiddingDetailPageProps {
  type: SolarStructureType;
  id: string;
}

const BiddingDetailPage = ({ type, id }: BiddingDetailPageProps) => {
  const { userType } = useTestLoginStore();
  const router = useRouter();

  // 다른 type 페이지들을 미리 prefetch하여 이동 속도 개선
  useEffect(() => {
    const otherTypes = Object.values(SOLAR_STRUCTURE_TYPES).filter(
      t => t !== type
    );
    otherTypes.forEach(otherType => {
      router.prefetch(`/bidding/${otherType}/${id}`);
    });
  }, [type, id, router]);

  return (
    <OrdersLayout sideType={type}>
      <div className="w-full flex flex-col">
        <BiddingDetailTop />
        <BidDetailInformation />
        <BidList />
        {userType === "partner" && <BidButton />}
      </div>
    </OrdersLayout>
  );
};

export default BiddingDetailPage;
