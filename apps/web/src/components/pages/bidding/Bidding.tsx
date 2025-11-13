import OrdersLayout from "@/components/Layout/bidding";
import { SOLAR_INSTALLATION_TYPES } from "@/constants";
import {
  SOLAR_STRUCTURE_TYPE_LABELS,
  SolarStructureType,
} from "@repo/constants";
import { Button } from "@repo/ui/button";
import { Pagination } from "@repo/ui/pagination";
import { BasicOption, Select } from "@repo/ui/select";
import { useRouter } from "next/router";
import { useMemo } from "react";
import BiddingItem from "./components/BiddingItem";
import { usePageUrl } from "@repo/hooks";

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
  const router = useRouter();
  const { currentPage, handlePageChange } = usePageUrl();

  // 경로에서 type 추출 (예: /bidding/residential-solar -> residential-solar)
  const type = useMemo(() => {
    const pathWithoutQuery = router.asPath.split("?")[0];
    const pathSegments = pathWithoutQuery.split("/");
    const typeIndex = pathSegments.indexOf("bidding");
    return (
      typeIndex !== -1 && pathSegments[typeIndex + 1]
        ? pathSegments[typeIndex + 1]
        : ""
    ) as SolarStructureType;
  }, [router.asPath]);

  // install 쿼리스트링 처리 (없으면 첫 번째 값 사용)
  const install = useMemo(() => {
    const installQuery = router.query.install as string | undefined;
    return installQuery || SOLAR_INSTALLATION_TYPES[0].value;
  }, [router.query.install]);

  const onChangeMobileType = (value: string) => {
    router.push(`/bidding/${value}?install=${install}`);
  };

  const handleChangeInstallationType = (value: string) => {
    router.push(`/bidding/${type}?install=${value}`);
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
              <BiddingItem
                key={`bidding-item-${index}`}
                id={index}
                type={type}
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

export default BiddingPage;
