import { Button } from "@repo/ui/button";

const OrdersContractTop = () => {
  return (
    <div className="flex items-center w-full justify-between mb-[20px] lg:mb-[45px]">
      <div className="flex items-center gap-[8px] lg:gap-[18px]">
        <div className="w-[24px] lg:w-[50px] h-[24px] lg:h-[50px] rounded-full bg-deep-gray"></div>

        <span className="bold-body lg:bold-heading4">(주)미래에너지솔루션</span>
      </div>

      <Button className="button-size-sm lg:button-size-lg w-[87px] lg:w-[200px]">
        계약하기
      </Button>
    </div>
  );
};

export default OrdersContractTop;
