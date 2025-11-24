import OrdersLayout from "@/components/Layout/bidding";
import { SOLAR_INSTALLATION_TYPES } from "@/constants";

import { Button } from "@repo/ui/button";
import { Pagination } from "@repo/ui/pagination";
import { BasicOption, Select } from "@repo/ui/select";
import BiddingItem from "./components/BiddingItem";
import { SOLAR_STRUCTURE_TYPE_LABELS } from "@repo/types";
import { useBidding } from "./hooks/useBidding";
import { Checkbox } from "@repo/ui/checkbox";

const MOBILE_TYPE_SELECT_OPTIONS: BasicOption[] = Object.entries(
  SOLAR_STRUCTURE_TYPE_LABELS
).map(([value, label]) => {
  return {
    label,
    value,
  };
});

const SOLAR_INSTALLATION_TYPE_OPTIONS: BasicOption[] =
  SOLAR_INSTALLATION_TYPES.map(({ title, value }) => {
    return {
      label: title,
      value,
    };
  });

// 견적확인 페이지
const BiddingPage = () => {
  const {
    currentPage,
    handleChangeInstallationType,
    handlePageChange,
    handleMyApplicationChange,
    install,
    myApplication,
    onChangeMobileType,
    type,
    quotesList,
    totalPages,
  } = useBidding();

  return (
    <OrdersLayout sideType={type}>
      <div className="flex flex-col gap-[35px] lg:gap-[55px] w-full">
        <div className="w-full">
          {/* mobile */}
          <div className="flex flex-col gap-[30px] lg:hidden">
            <div className="flex gap-[10px]">
              <Select
                options={MOBILE_TYPE_SELECT_OPTIONS}
                type="basic"
                value={type}
                onChange={onChangeMobileType}
                size="sm"
                labelClassName="bold-caption lg:bold-body"
              />

              <Select
                options={SOLAR_INSTALLATION_TYPE_OPTIONS}
                type="basic"
                value={install}
                onChange={handleChangeInstallationType}
                size="sm"
                labelClassName="bold-caption lg:bold-body"
              />
            </div>

            <div className="flex justify-end items-center gap-[13px] cursor-pointer">
              <Checkbox
                id="my-application"
                checked={myApplication}
                onChange={e => handleMyApplicationChange(e.target.checked)}
              />
              <label
                className="medium-body cursor-pointer"
                htmlFor="my-application"
              >
                내 신청
              </label>
            </div>
          </div>

          {/* desktop */}
          <div className="hidden lg:flex justify-between w-full">
            <div className="flex gap-[10px]">
              {SOLAR_INSTALLATION_TYPE_OPTIONS.map(({ label, value }) => (
                <Button
                  key={`desktop-installation-type-${value}`}
                  className="button-size-md w-[122px]"
                  variant={install === value ? "solid" : "outline"}
                  onClick={() => handleChangeInstallationType(value)}
                >
                  {label}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-[13px] cursor-pointer">
              <Checkbox
                id="my-application-desktop"
                checked={myApplication}
                onChange={e => handleMyApplicationChange(e.target.checked)}
              />
              <label
                className="medium-body cursor-pointer"
                htmlFor="my-application-desktop"
              >
                내 신청
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[40px] lg:gap-[64px]">
          {/* Items */}
          <div className="flex flex-col">
            {quotesList.map(item => (
              <BiddingItem key={`bidding-item-${item.id}`} itemData={item} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </OrdersLayout>
  );
};

export default BiddingPage;
