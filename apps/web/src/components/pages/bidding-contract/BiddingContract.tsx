import OrdersLayout from "@/components/Layout/bidding";
import { SolarStructureType, SOLAR_STRUCTURE_TYPES } from "@repo/constants";
import { useRouter } from "next/router";
import { useEffect } from "react";
import BiddingContractTop from "./components/BiddingContractTop";
import BiddingContractInfo from "./components/BiddingContractInfo";
import BiddingContractInstallList from "./components/BiddingContractInstallList";
import { Pagination } from "@repo/ui/pagination";

interface BiddingContractPageProps {
  type: SolarStructureType;
  id: string;
}

const BiddingContractPage = ({ type, id }: BiddingContractPageProps) => {
  const router = useRouter();

  // 다른 type 페이지들을 미리 prefetch하여 이동 속도 개선
  useEffect(() => {
    const otherTypes = Object.values(SOLAR_STRUCTURE_TYPES).filter(
      t => t !== type
    );
    otherTypes.forEach(otherType => {
      router.prefetch(`/bidding/${otherType}/${id}/contract`);
    });
  }, [type, id, router]);

  return (
    <OrdersLayout sideType={type}>
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
