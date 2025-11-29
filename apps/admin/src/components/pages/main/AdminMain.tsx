import AdminRootLayout from "@/components/layouts/root";
import { useAdminMain } from "./hooks/useAdminMain";
import {
  USERS_STATS_BIDS_TYPES,
  UsersStatsBidsType,
} from "@/api/users/types/dto/users-stats-bids-dto";
import { Fragment } from "react";
import { Spinner } from "@repo/ui/spinner";
import DatePicker from "@/components/DatePicker";
import BiddingStatsChart from "./components/BiddingStatsChart";

const AdminMainPage = () => {
  const {
    partner,
    total,
    bidsType,
    handleChangeBidsType,
    isLoadingUsersStatsTodayRegistrations,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    chartData,
    isLoadingUsersStatsBids,
  } = useAdminMain();

  return (
    <AdminRootLayout>
      <div className="py-[25px] lg:py-[18px] px-[25px] border-1 border-primary rounded-[4px] flex flex-col gap-[35px]">
        <span className="bold-body lg:bold-heading6 text-primary text-center lg:text-left">
          오늘 가입 고객
        </span>

        {isLoadingUsersStatsTodayRegistrations ? (
          <div className="w-full h-[142px] lg:h-[140px] flex justify-center items-center">
            <Spinner size="lg" className="text-primary" />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-[14px] lg:gap-[0] lg:justify-between w-full items-center">
            <div className="flex flex-col items-center mx-auto">
              <span className="bold-heading5 lg:bold-heading3">{`${total}명`}</span>
              <span className="bold-body lg:bold-heading5">전체</span>
            </div>

            <div className="w-[126px] lg:w-[1px] h-[1px] lg:h-[140px] border-1 border-primary"></div>

            <div className="flex flex-col items-center mx-auto">
              <span className="bold-heading5 lg:bold-heading3">{`${partner}명`}</span>
              <span className="bold-body lg:bold-heading5">파트너</span>
            </div>
          </div>
        )}
      </div>

      <div className="py-[25px] lg:py-[18px] px-[25px] border-1 border-primary rounded-[4px] gap-[24px] mt-[16px] lg:mt-[24px] flex flex-col w-full">
        {/* top */}
        <div className="flex flex-col gap-[16px] lg:flex-row lg:justify-between w-full">
          {/* 입찰 건수 , 일간 | 주간 | 월간 */}
          <div className="w-full lg:w-fit flex items-center justify-between lg:justify-normal gap-0 lg:gap-[40px]">
            <span className="bold-body lg:bold-heading6 text-primary text-center lg:text-left">
              입찰 건수
            </span>

            <div className="flex items-center gap-[12px]">
              {Object.entries(USERS_STATS_BIDS_TYPES).map(
                ([key, label], index) => {
                  const isActive = bidsType === key;
                  return (
                    <Fragment key={key}>
                      {index > 0 ? (
                        <hr
                          role="separator"
                          aria-hidden="true"
                          className="h-[16px] w-[1px] bg-primary"
                        />
                      ) : null}
                      <button
                        type="button"
                        aria-pressed={isActive}
                        onClick={() =>
                          handleChangeBidsType(key as UsersStatsBidsType)
                        }
                        className={`bold-body transition-colors duration-200 cursor-pointer ${
                          isActive
                            ? "text-primary"
                            : "text-primary/40 hover:text-primary"
                        }`}
                      >
                        {label}
                      </button>
                    </Fragment>
                  );
                }
              )}
            </div>
          </div>

          {/* 달력 */}
          <DatePicker
            startDate={startDate}
            endDate={endDate}
            onDateRangeChange={(start, end) => {
              setStartDate(start);
              setEndDate(end);
            }}
            placeholder="날짜 범위 선택"
          />
        </div>

        {/* chart */}
        <BiddingStatsChart
          chartData={chartData}
          isLoading={isLoadingUsersStatsBids}
        />
      </div>
    </AdminRootLayout>
  );
};

export default AdminMainPage;
