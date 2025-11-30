// 견적확인 상세 페이지
import OrdersLayout from "@/components/Layout/bidding";
import BiddingDetailTop from "./components/BiddingDetailTop";
import BidDetailInformation from "./components/BidDetailInformation";
import BidList from "./components/BidList";
import BidButton from "./components/BidButton";
import { SolarStructureType } from "@repo/types";
import { useBiddingDetail } from "./hooks/useBiddingDetail";

const BiddingDetailPage = () => {
  const {
    type,
    partnerStatus,
    quote,
    bidsList,
    currentPage,
    handlePageChange,
    hasMyBid,
    isMyQuote,
    myBidId,
    totalPages,
    isQuoteDetailLoading,
    totalCount,
  } = useBiddingDetail();

  return (
    <OrdersLayout
      sideType={type as SolarStructureType}
      isLoading={isQuoteDetailLoading}
    >
      <div className="w-full flex flex-col">
        <BiddingDetailTop
          createdAt={quote?.createdAt}
          baseAddress={quote?.baseAddress}
          structureTypeLabel={quote?.structureTypeLabel}
          plannedCapacity={quote?.plannedCapacity}
          remainingHours={quote?.remainingHours}
          status={quote?.status}
          statusLabel={quote?.statusLabel}
        />
        <BidDetailInformation
          baseAddress={quote?.baseAddress}
          detailAddress={quote?.detailAddress}
          currentCapacity={quote?.currentCapacity}
          plannedCapacity={quote?.plannedCapacity}
          monthlyAverageUsage={quote?.monthlyAverageUsage}
          otherRequests={quote?.otherRequests}
          imageUrls={quote?.imageUrls}
        />
        <BidList
          totalPages={totalPages}
          bidsList={bidsList}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          totalCount={totalCount}
        />
        {partnerStatus === "APPROVED" && (
          <BidButton
            hasMyBid={hasMyBid}
            isMyQuote={isMyQuote}
            myBidId={myBidId}
            quoteId={quote?.id}
          />
        )}
      </div>
    </OrdersLayout>
  );
};

export default BiddingDetailPage;
