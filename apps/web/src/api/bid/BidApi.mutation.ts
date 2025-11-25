import { UseMutationParams } from "@repo/types";
import bidApi from "./BidApi";
import { useMutation } from "@tanstack/react-query";

// 입찰 수락 (계약하기) (사용자)
export const useAcceptBidMutation = (
  params?: UseMutationParams<typeof bidApi.acceptBid>
) => {
  return useMutation({
    mutationFn: bidApi.acceptBid,
    ...params?.options,
  });
};

// 입찰 취소 (파트너)
export const useCancelBidMutation = (
  params?: UseMutationParams<typeof bidApi.cancelBid>
) => {
  return useMutation({
    mutationFn: bidApi.cancelBid,
    ...params?.options,
  });
};

// 입찰 요청 (파트너)
export const useRequestBidMutation = (
  params?: UseMutationParams<typeof bidApi.requestBid>
) => {
  return useMutation({
    mutationFn: bidApi.requestBid,
    ...params?.options,
  });
};
