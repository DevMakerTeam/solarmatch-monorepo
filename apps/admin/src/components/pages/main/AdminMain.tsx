import BiddingStatsChart, {
  ChartDatum,
  ChartRange,
} from "@/components/pages/main/components/BiddingStatsChart";

import AdminRootLayout from "@/components/layouts/root";

const CHART_DATA: Record<ChartRange, ChartDatum[]> = {
  daily: [
    { label: "7일", value: 0 },
    { label: "8일", value: 10 },
    { label: "9일", value: 15 },
    { label: "10일", value: 24 },
    { label: "11일", value: 20 },
    { label: "12일", value: 10 },
    { label: "13일", value: 16 },
  ],
  weekly: [
    { label: "1주", value: 95 },
    { label: "2주", value: 82 },
    { label: "3주", value: 110 },
    { label: "4주", value: 76 },
  ],
  monthly: [
    { label: "3월", value: 320 },
    { label: "4월", value: 365 },
    { label: "5월", value: 298 },
    { label: "6월", value: 412 },
    { label: "7월", value: 358 },
  ],
};

const AdminMainPage = () => {
  return (
    <AdminRootLayout>
      <div className="py-[25px] lg:py-[18px] px-[25px] border-1 border-primary rounded-[4px] flex flex-col gap-[35px]">
        <span className="bold-body lg:bold-heading6 text-primary text-center lg:text-left">
          오늘 가입 고객
        </span>

        <div className="flex flex-col lg:flex-row gap-[14px] lg:gap-[0] lg:justify-between w-full items-center">
          <div className="flex flex-col items-center mx-auto">
            <span className="bold-heading5 lg:bold-heading3">29명</span>
            <span className="bold-body lg:bold-heading5">전체</span>
          </div>

          <div className="w-[126px] lg:w-[1px] h-[1px] lg:h-[140px] border-1 border-primary"></div>

          <div className="flex flex-col items-center mx-auto">
            <span className="bold-heading5 lg:bold-heading3">14명</span>
            <span className="bold-body lg:bold-heading5">파트너</span>
          </div>
        </div>
      </div>

      <div className="mt-[16px] lg:mt-[24px]">
        <div className="py-[25px] lg:py-[18px] px-[25px] border-1 border-primary rounded-[4px] flex flex-col gap-[24px]">
          <BiddingStatsChart title="입찰 건수" data={CHART_DATA} />
        </div>
      </div>
    </AdminRootLayout>
  );
};

export default AdminMainPage;
