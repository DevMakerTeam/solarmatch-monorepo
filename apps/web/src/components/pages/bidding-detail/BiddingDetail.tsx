// 견적확인 상세 페이지
import OrdersLayout from "@/components/Layout/bidding";
import { useRouter } from "next/router";
import BiddingDetailTop from "./components/BiddingDetailTop";
import BidDetailInformation from "./components/BidDetailInformation";
import BidList from "./components/BidList";
import BidButton from "./components/BidButton";
import { SolarStructureType } from "@repo/types";
import { useAuthStatus } from "@/hooks/useAuthStatus";

const BiddingDetailPage = () => {
  const { user } = useAuthStatus();
  const { partnerStatus } = user || {};

  const router = useRouter();
  const { type } = router.query;

  return (
    <OrdersLayout sideType={type as SolarStructureType}>
      <div className="w-full flex flex-col">
        <BiddingDetailTop />
        <BidDetailInformation />
        <BidList />
        {partnerStatus === "APPROVED" && <BidButton />}
      </div>
    </OrdersLayout>
  );
};

export default BiddingDetailPage;
