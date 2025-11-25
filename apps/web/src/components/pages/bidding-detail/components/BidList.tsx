import { BidsModel } from "@/api/quote/types/model/get-quote-detail-model";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { Pagination } from "@repo/ui/pagination";
import { cn } from "@repo/utils";
import Image from "next/image";
import { useRouter } from "next/router";

interface BidListProps {
  totalPages?: number;
  bidsList?: BidsModel[];
  handlePageChange: (page: number) => void;
  currentPage: number;
}

const BidList = ({
  totalPages,
  bidsList,
  currentPage,
  handlePageChange,
}: BidListProps) => {
  const router = useRouter();
  const { user } = useAuthStatus();
  const { partnerStatus } = user || {};

  const onClickBidItem = () => {
    if (partnerStatus !== "APPROVED") {
      const currentPath = router.asPath.split("?")[0];
      router.push(`${currentPath}/contract`);
    }
  };

  return (
    <div className="w-full flex flex-col gap-[11px]">
      <span className="bold-body text-deep-gray">업체 목록</span>

      <div className="grid gird-cols-1 lg:grid-cols-3 lg:gap-[15px] gap-[19px] mb-[50px] lg:mb-[60px]">
        {bidsList?.map(item => (
          <BidItem
            key={`bid-item-${item.bidId}`}
            onClickItem={onClickBidItem}
            bidItem={item}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages ?? 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BidList;

interface BidItemProps {
  onClickItem: () => void;
  bidItem: BidsModel;
}

const BidItem = ({ onClickItem, bidItem }: BidItemProps) => {
  const { bidPrice, companyName, logoUrl } = bidItem || {};
  const { user } = useAuthStatus();
  const { partnerStatus } = user || {};

  return (
    <div
      className={cn(
        "p-[13px] rounded-[8px] border-1 border-border-color shadow-[2px_4px_7px_-2px_rgba(0,0,0,0.25)] flex flex-col gap-[4px] lg:gap-[24px]",
        partnerStatus !== "APPROVED" && "cursor-pointer hover:border-black"
      )}
      onClick={onClickItem}
    >
      <div className="flex items-center gap-[9px]">
        <div className="w-[30px] h-[30px] rounded-full overflow-hidden relative">
          <Image src={logoUrl} alt="logo" fill className="object-cover" />
        </div>

        <span className="bold-body">{companyName}</span>
      </div>

      <div className="w-full flex justify-end">
        <span className="medium-body">{bidPrice.toLocaleString()} 만원</span>
      </div>
    </div>
  );
};
