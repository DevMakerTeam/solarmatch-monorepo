import { ApiResponse, PaginationResponseData, QuoteModel } from "@repo/types";

export type BidsModel = {
  bidId: number;
  partnerId: number;
  companyName: string;
  logoUrl: string;
  bidPrice: number;
};

export type GetQuoteDetailModel = ApiResponse<{
  quote: QuoteModel;
  bids: PaginationResponseData<BidsModel>;
  isMyQuote: boolean | null;
  hasMyBid: boolean | null;
  myBidId: number | null;
}>;
