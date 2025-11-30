import OrdersLayout from "@/components/Layout/bidding";
import { SolarStructureType } from "@repo/types";
import BiddingContractTop from "./components/BiddingContractTop";
import BiddingContractInfo from "./components/BiddingContractInfo";
import BiddingContractInstallList from "./components/BiddingContractInstallList";
import { Pagination } from "@repo/ui/pagination";
import { useBiddingContract } from "./hooks/useBiddingContract";

const BiddingContractPage = () => {
  const {
    bidDetail,
    currentPage,
    handlePageChange,
    isBidDetailLoading,
    totalCount,
    totalPages,
    type,
    onClickAcceptBid,
    isAcceptBidPending,
  } = useBiddingContract();

  return (
    <OrdersLayout
      sideType={type as SolarStructureType}
      isLoading={isBidDetailLoading}
    >
      <div className="flex flex-col w-full">
        <BiddingContractTop
          data={bidDetail}
          onClickAcceptBid={onClickAcceptBid}
          isAcceptBidPending={isAcceptBidPending}
        />
        <BiddingContractInfo data={bidDetail} />
        <BiddingContractInstallList data={bidDetail} />

        {!!totalCount && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </OrdersLayout>
  );
};

export default BiddingContractPage;
