// 견적확인 상세 페이지
import OrdersLayout from "@/components/Layout/bidding";
import { useTestLoginStore } from "@/stores/testLoginStore";
import { useRouter } from "next/router";
import BiddingDetailTop from "./components/BiddingDetailTop";
import BidDetailInformation from "./components/BidDetailInformation";
import BidList from "./components/BidList";
import BidButton from "./components/BidButton";
import { SolarStructureType } from "@repo/types";

const BiddingDetailPage = () => {
  const { userType } = useTestLoginStore();
  const router = useRouter();
  const { type } = router.query;

  return (
    <OrdersLayout sideType={type as SolarStructureType}>
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
