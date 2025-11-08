import { useTestLoginStore } from "@/stores/testLoginStore";
import { cn } from "@repo/utils";
import { useRouter } from "next/router";

const BidList = () => {
  const router = useRouter();
  const { userType } = useTestLoginStore();

  const onClickBidItem = () => {
    if (userType !== "partner") {
      const currentPath = router.asPath.split("?")[0];
      router.push(`${currentPath}/contract`);
    }
  };

  return (
    <div className="w-full flex flex-col gap-[11px]">
      <span className="bold-body text-deep-gray">업체 목록</span>

      <div className="grid gird-cols-1 lg:grid-cols-3 lg:gap-[15px] gap-[19px]">
        {new Array(9).fill(0).map((_, index) => (
          <BidItem
            key={`bid-item-${index}`}
            onClickItem={onClickBidItem}
            userType={userType}
          />
        ))}
      </div>
    </div>
  );
};

export default BidList;

interface BidItemProps {
  onClickItem: () => void;
  userType: "partner" | "user" | null;
}

const BidItem = ({ onClickItem, userType }: BidItemProps) => {
  return (
    <div
      className={cn(
        "p-[13px] rounded-[8px] border-1 border-border-color shadow-[2px_4px_7px_-2px_rgba(0,0,0,0.25)] flex flex-col gap-[4px] lg:gap-[24px]",
        userType !== "partner" && "cursor-pointer hover:border-black"
      )}
      onClick={onClickItem}
    >
      <div className="flex items-center gap-[9px]">
        <div className="w-[30px] h-[30px] rounded-full bg-light-gray" />

        <span className="bold-body">(주)미래에너지솔루션</span>
      </div>

      <div className="w-full flex justify-end">
        <span className="medium-body">350 만원</span>
      </div>
    </div>
  );
};
