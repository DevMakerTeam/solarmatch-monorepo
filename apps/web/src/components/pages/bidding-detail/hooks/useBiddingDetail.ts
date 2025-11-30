import { useGetQuoteDetailQuery } from "@/api/quote/QuoteApi.query";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { usePageUrl } from "@repo/hooks";
import { useRouter } from "next/router";

const PAGE_SIZE = 9;

export const useBiddingDetail = () => {
  const { user } = useAuthStatus();
  const { partnerStatus } = user || {};

  const { currentPage, handlePageChange } = usePageUrl();

  const router = useRouter();
  const { type, id } = router.query;

  // 견적 상세 조회
  const { data: quoteDetaildata, isLoading: isQuoteDetailLoading } =
    useGetQuoteDetailQuery({
      variables: {
        quoteId: Number(id),
        page: currentPage,
        size: PAGE_SIZE,
      },
      options: {
        enabled: !!id,
      },
    });
  const { data: quoteDetail } = quoteDetaildata || {};
  const { quote, bids, hasMyBid, isMyQuote, myBidId } = quoteDetail || {};

  const { data: bidsList = [], totalPages, total: totalCount } = bids || {};

  return {
    partnerStatus,
    type,
    currentPage,
    handlePageChange,
    bidsList,
    totalPages,
    quote,
    hasMyBid,
    isMyQuote,
    myBidId,
    isQuoteDetailLoading,
    totalCount: totalCount ?? 0,
  };
};
