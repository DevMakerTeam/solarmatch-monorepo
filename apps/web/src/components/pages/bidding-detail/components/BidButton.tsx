import { useModals } from "@repo/hooks";
import { Button } from "@repo/ui/button";
import OrdersDetailBidModal from "./BidModal";

const BidButton = () => {
  const { open, close } = useModals();

  const onClickBidButton = () => {
    open(OrdersDetailBidModal, {
      onClose: close,
    });
  };

  return (
    <Button
      className="mt-[50px] lg:mt-[80px] button-size-lg lg:button-size-xl w-[200px] lg:w-[290px] mx-auto"
      onClick={onClickBidButton}
    >
      입찰하기
    </Button>
  );
};

export default BidButton;
