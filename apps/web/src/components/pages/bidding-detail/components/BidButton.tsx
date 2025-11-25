import { useModals } from "@repo/hooks";
import { Button } from "@repo/ui/button";
import RequestBidModal from "./RequestBidModal";
import { useCancelBidMutation } from "@/api/bid/BidApi.mutation";
import { isNotNullish } from "@repo/types";
import { useQueryClient } from "@tanstack/react-query";
import { QUOTE_API_QUERY_KEY } from "@/api/quote/QuoteApi.query";

interface BidButtonProps {
  hasMyBid?: boolean | null;
  isMyQuote?: boolean | null;
  myBidId?: number | null;
  quoteId?: number;
}

const BidButton = ({
  hasMyBid,
  // isMyQuote,
  myBidId,
  quoteId,
}: BidButtonProps) => {
  const queryClient = useQueryClient();
  const { open, close } = useModals();

  // 공통 파트너일때만 밑에 버튼 보여야하고

  // 입찰하기 버튼이 보이는 조건
  // hasMyBid가 false일때

  // 입찰취소 버튼이 보이는 조건
  // hasMyBid가 true일때

  const { mutate: cancelBidMutation, isPending: isCancelBidPending } =
    useCancelBidMutation({
      options: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: QUOTE_API_QUERY_KEY.GET_QUOTE_DETAIL({
              quoteId: Number(quoteId),
            }),
          });
        },
      },
    });
  const onClickBidButton = () => {
    if (hasMyBid) {
      // 입찰취소
      if (!isNotNullish(myBidId)) return;
      cancelBidMutation(myBidId);
    } else {
      // 입찰하기
      open(RequestBidModal, {
        onClose: close,
        quoteId,
      });
    }
  };

  return (
    <Button
      className="mt-[50px] lg:mt-[80px] button-size-lg lg:button-size-xl w-[200px] lg:w-[290px] mx-auto"
      onClick={onClickBidButton}
      variant={hasMyBid ? "cancel" : "solid"}
      isLoading={isCancelBidPending}
    >
      {hasMyBid ? "입찰취소" : "입찰하기"}
    </Button>
  );
};

export default BidButton;
