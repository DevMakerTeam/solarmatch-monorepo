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
import OrdersItem from "./components/OrdersItem";
import { usePageUrl } from "@repo/hooks";

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
const OrdersPage = ({
  type,
  install,
}: {
  type: OrderType;
  install: string;
}) => {
  const router = useRouter();
  const { currentPage, handlePageChange } = usePageUrl();

  const onChangeMobileType = (value: string) => {
    router.push(`/orders/${value}`);
  };

  const handleChangeInstallationType = (value: string) => {
    router.push(`/orders/${type}?install=${value}`);
  };

  return (
    <OrdersLayout sideType={type} installType={install}>
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
              value={install}
              onChange={handleChangeInstallationType}
            />
          </div>

          {/* desktop */}
          <div className="hidden lg:flex gap-[10px]">
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
        </div>

        <div className="flex flex-col gap-[40px] lg:gap-[64px]">
          {/* Items */}
          <div className="flex flex-col gap-[16px]">
            {/* Item */}
            {Array.from({ length: 8 }).map((_, index) => (
              <OrdersItem
                key={`order-item-${index}`}
                id={index}
                type={type}
                currentPage={currentPage}
                install={install}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </OrdersLayout>
  );
};

export default OrdersPage;
