import { DEFAULT_LOGO_URL } from "@repo/constants";
import { BidResponse } from "@repo/types";
import { Button } from "@repo/ui/button";
import Image from "next/image";

interface BiddingContractTopProps {
  data?: BidResponse;
  onClickAcceptBid: () => void;
  isAcceptBidPending: boolean;
}

const BiddingContractTop = ({
  data,
  onClickAcceptBid,
  isAcceptBidPending,
}: BiddingContractTopProps) => {
  if (!data) return null;

  const { companyName, logoUrl } = data;
  const partnerLogoUrl = logoUrl || DEFAULT_LOGO_URL;

  return (
    <div className="flex items-center w-full justify-between mb-[20px] lg:mb-[45px]">
      <div className="flex items-center gap-[8px] lg:gap-[18px]">
        <div className="w-[24px] lg:w-[50px] h-[24px] lg:h-[50px] rounded-full relative overflow-hidden">
          <Image
            src={partnerLogoUrl}
            alt="partner-logo"
            fill
            className="object-cover"
          />
        </div>

        <span className="bold-body lg:bold-heading4">{companyName}</span>
      </div>

      <Button
        className="button-size-sm lg:button-size-lg w-[87px] lg:w-[200px]"
        onClick={onClickAcceptBid}
        isLoading={isAcceptBidPending}
        // disabled={isAcceptBidPending}
      >
        계약하기
      </Button>
    </div>
  );
};

export default BiddingContractTop;
