import OrdersLayout from "@/components/Layout/bidding";
import { SolarStructureType } from "@repo/types";
import { useRouter } from "next/router";
import BiddingContractTop from "./components/BiddingContractTop";
import BiddingContractInfo from "./components/BiddingContractInfo";
import BiddingContractInstallList from "./components/BiddingContractInstallList";
import { Pagination } from "@repo/ui/pagination";

const BiddingContractPage = () => {
  const router = useRouter();
  const { type } = router.query;

  return (
    <OrdersLayout sideType={type as SolarStructureType}>
      <div className="flex flex-col w-full">
        <BiddingContractTop />
        <BiddingContractInfo />
        <BiddingContractInstallList />
        <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
      </div>
    </OrdersLayout>
  );
};

export default BiddingContractPage;
