import { useAcceptBidMutation } from "@/api/bid/BidApi.mutation";
import {
  BID_API_QUERY_KEY,
  useGetBidDetailQuery,
} from "@/api/bid/BidApi.query";
import { useModals, usePageUrl } from "@repo/hooks";
import { isNotNullish } from "@repo/types";
import { ConfirmModal } from "@repo/ui/modal";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

const PAGE_SIZE = 4;

export const useBiddingContract = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { type } = router.query;
  const { currentPage, handlePageChange } = usePageUrl();
  const { open: acceptBidModalOpen, close: acceptBidModalClose } = useModals();

  const { mutate: acceptBidMutation, isPending: isAcceptBidPending } =
    useAcceptBidMutation({
      options: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: BID_API_QUERY_KEY.GET_BID_DETAIL({
              bidId: Number(id),
              casePage: currentPage,
              caseSize: PAGE_SIZE,
            }),
          });
          acceptBidModalClose();
        },
      },
    });

  const { id } = router.query;

  const { data: bidDetailData, isLoading: isBidDetailLoading } =
    useGetBidDetailQuery({
      variables: {
        bidId: Number(id),
        casePage: currentPage,
        caseSize: PAGE_SIZE,
      },
      options: {
        enabled: !!id,
      },
    });
  const { data: bidDetail } = bidDetailData || {};
  const totalPages = bidDetail?.contractCases?.totalPages ?? 1;
  const totalCount = bidDetail?.contractCases?.total ?? 0;

  const onClickAcceptBid = () => {
    if (!isNotNullish(id)) return;

    acceptBidModalOpen(ConfirmModal, {
      onClose: acceptBidModalClose,
      onConfirm: () => {
        acceptBidMutation(Number(id));
      },
      text: "계약하시겠습니까?",
    });
  };

  return {
    bidDetail,
    currentPage,
    handlePageChange,
    isBidDetailLoading,
    totalCount,
    totalPages,
    type,
    onClickAcceptBid,
    isAcceptBidPending,
  };
};
