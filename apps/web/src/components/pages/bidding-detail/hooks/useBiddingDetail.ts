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

  const { data: quoteDetaildata } = useGetQuoteDetailQuery({
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

  const { data: bidsList = [], totalPages } = bids || {};

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
  };
};
