import React from "react";

const OrdersDetailTop = () => {
  return (
    <div className="w-full flex flex-col gap-[10px] lg:gap-[13px] mb-[19px] lg:mb-[22px]">
      {/* 날짜 */}
      <div className="flex items-center gap-[14px]">
        <span className="regular-small lg:regular-caption">2025-09-05</span>

        <span className="lg:hidden regular-small text-cancel">5시간 남음</span>
      </div>

      {/* 타이틀 */}
      <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-[8px] lg:gap-0 pb-[19px] lg:pb-0 border-b-1 border-b-border-color lg:border-b-0">
        <div className="flex items-center gap-[12px] lg:gap-[20px]">
          <span className="bold-body lg:bold-heading4">
            경상북도 성주군 주택용 3kw
          </span>

          <div className="w-[65px] lg:w-[82px] h-[24px] lg:h-[30px] rounded-[20px] border-1 border-[#cccccc] text-deep-gray regular-small lg:regular-body flex items-center justify-center">
            기본형
          </div>

          <span className="hidden lg:block regular-caption text-cancel">
            5시간 남음
          </span>
        </div>

        <div className="flex justify-center items-center w-[76px] lg:w-[116px] h-[24px] lg:h-[40px] rounded-[4px] text-nowrap bg-green text-white bold-small lg:bold-body">
          입찰대기
        </div>
      </div>
    </div>
  );
};

export default OrdersDetailTop;
