import { cn } from "@repo/utils";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { ModalProps } from "./types";

const Modal = ({
  children,
  onClose,
  modalContainerClassName,
  modalContentClassName,
}: ModalProps) => {
  return (
    <>
      {/* 오버레이 */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* 모달 컨텐츠 */}
      <div
        className={cn(
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[20px] z-50 min-w-[85%] lg:min-w-[450px]",
          modalContainerClassName
        )}
      >
        {/* X 버튼 */}
        <Button
          variant="ghost"
          onClick={onClose}
          className="absolute top-[20px] right-[20px] w-[22px] h-[22px] flex items-center justify-center text-black"
        >
          <Icon iconName="x" className="w-[22px] h-[22px]" />
        </Button>

        {/* 컨텐츠 */}
        <div
          className={cn(
            "pt-[60px] md:pt-[80px] px-[20px] pb-[25px]",
            modalContentClassName
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
