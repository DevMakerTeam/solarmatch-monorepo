import OrdersLayout from "@/components/Layout/orders";
import {
  ORDER_TYPE_LABELS,
  OrderType,
  SOLAR_INSTALLATION_TYPES,
} from "@/constants";
import { Button } from "@repo/ui/button";
import { Pagination } from "@repo/ui/pagination";
import { BasicOption, Select } from "@repo/ui/select";
import { useRouter } from "next/router";

const MOBILE_TYPE_SELECT_OPTIONS: BasicOption[] = Object.entries(
  ORDER_TYPE_LABELS
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

// 신청내역 페이지
const OrdersPage = ({ type }: { type: OrderType }) => {
  const router = useRouter();

  const installType =
    (router.query.install as string) || SOLAR_INSTALLATION_TYPES[0].value;

  const onChangeMobileType = (value: string) => {
    router.push(`/orders/${value}`);
  };

  const handleChangeInstallationType = (value: string) => {
    router.push(`/orders/${type}?install=${value}`);
  };

  return (
    <OrdersLayout sideType={type}>
      <div className="flex flex-col gap-[35px] lg:gap-[55px] w-full">
        <div className="w-full">
          {/* mobile */}
          <div className="flex gap-[20px] lg:hidden">
            <Select
              options={MOBILE_TYPE_SELECT_OPTIONS}
              type="basic"
              value={type}
              onChange={onChangeMobileType}
            />

            <Select
              options={SOLAR_INSTALLATION_TYPE_OPTIONS}
              type="basic"
              value={installType}
              onChange={handleChangeInstallationType}
            />
          </div>

          {/* desktop */}
          <div className="hidden lg:flex gap-[10px]">
            {SOLAR_INSTALLATION_TYPE_OPTIONS.map(({ label, value }) => (
              <Button
                key={`desktop-installation-type-${value}`}
                className="button-size-md w-[122px]"
                variant={installType === value ? "solid" : "outline"}
                onClick={() => handleChangeInstallationType(value)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[40px] lg:gap-[64px]">
          {/* Items */}
          <div className="flex flex-col gap-[16px]">
            {/* Item */}
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={`order-item-${index}`}
                className="w-full flex justify-between lg:items-center pb-[20px] lg:pb-[16px] border-b-1 border-border-color"
              >
                <div className="flex lg:items-center gap-[10px] lg:gap-[16px]">
                  <div className="flex flex-col lg:flex-row gap-[12px] lg:gap-[14px]">
                    <span className="bold-caption lg:bold-body">
                      경상북도 성주군 주택용 3kw
                    </span>

                    <div className="p-[3px_11.5px] w-fit text-nowrap rounded-[20px] regular-small text-deep-gray border-1 border-border-color">
                      캐노피형
                    </div>
                  </div>

                  <span className="regular-small text-cancel">5시간 남음</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-[12px] lg:gap-[16px] items-center">
                  <div className="order-1 lg:order-2 w-[76px] lg:w-[102px] h-[24px] lg:h-[30px] rounded-[4px] bg-green text-white bold-small whitespace-nowrap flex items-center justify-center">
                    <span className="regular-small">입찰대기</span>
                  </div>

                  <span className="order-2 lg:order-1 regular-small">
                    2025-09-05
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
        </div>
      </div>
    </OrdersLayout>
  );
};

export default OrdersPage;
