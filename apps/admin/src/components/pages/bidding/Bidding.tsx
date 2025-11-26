import AdminRootLayout from "@/components/layouts/root";
import {
  QUOTE_STATUS,
  QuoteModel,
  SOLAR_INSTALLATION_TYPE_LABELS,
  SOLAR_STRUCTURE_TYPE_LABELS,
  SolarInstallationType,
  SolarStructureType,
} from "@repo/types";
import { Button } from "@repo/ui/button";
import { cn } from "@repo/utils";
import { Fragment, useMemo } from "react";
import { useBidding } from "./hooks/useBidding";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { Select } from "@repo/ui/select";
import { Pagination } from "@repo/ui/pagination";
import { Spinner } from "@repo/ui/spinner";

interface BiddingPageProps {
  structureType: SolarStructureType;
}

// 마감 여부 판단 함수
const isQuoteClosed = (status: string, deadlineDate: string): boolean => {
  // 입찰마감 또는 입찰취소 상태면 마감
  if (status === QUOTE_STATUS.CLOSED || status === QUOTE_STATUS.CANCELLED) {
    return true;
  }

  const now = dayjs();
  const endDate = dayjs(deadlineDate);

  // 마감일이 지난 경우
  if (now.isAfter(endDate) || now.isSame(endDate)) {
    return true;
  }

  // 마감일까지 남은 시간 계산
  const remainingHours = endDate.diff(now, "hour");
  const remainingMinutes = endDate.diff(now, "minute");

  // 남은 시간이 0 이하이면 마감
  if (remainingHours <= 0 && remainingMinutes <= 0) {
    return true;
  }

  return false;
};

// 남은 시간 계산 함수
const getRemainingTime = (deadlineDate: string): string => {
  const now = dayjs();
  const endDate = dayjs(deadlineDate);

  // 마감일까지 남은 시간 계산
  const remainingHours = endDate.diff(now, "hour");
  const remainingMinutes = endDate.diff(now, "minute");

  if (remainingHours <= 0 && remainingMinutes <= 0) {
    return "마감";
  }

  // 1시간 미만이면 분 단위로 표시
  if (remainingHours < 1) {
    return `${remainingMinutes}분 남음`;
  }

  // 1시간 이상이면 시간 단위로 표시
  return `${remainingHours}시간 남음`;
};

const BiddingPage = ({ structureType }: BiddingPageProps) => {
  const {
    installationType,
    handleInstallationTypeChange,
    quotesList,
    currentPage,
    totalPages,
    handlePageChange,
    editQuote,
    isEditQuotePending,
  } = useBidding(structureType);

  const columnHelper = createColumnHelper<QuoteModel>();
  const columns = useMemo(() => {
    return [
      columnHelper.display({
        id: "biddingName",
        header: "입찰명",
        cell: info => {
          const { baseAddress, installationTypeLabel, plannedCapacity } =
            info.row.original;
          return `${baseAddress} ${installationTypeLabel} ${plannedCapacity}kw`;
        },
      }),
      columnHelper.display({
        id: "remainingTime",
        header: "잔여 시간",
        cell: info => {
          const { deadlineDate, status } = info.row.original;

          if (isQuoteClosed(status, deadlineDate)) {
            return "마감";
          }

          return getRemainingTime(deadlineDate);
        },
      }),
      columnHelper.accessor("bidStartDate", {
        cell: info => dayjs(info.getValue()).format("YYYY-MM-DD"),
        header: "입찰 시작 일",
      }),
      columnHelper.display({
        id: "deadlineHour",
        header: "마감 시간",
        cell: info => {
          const { status, deadlineHours, deadlineDate } = info.row.original;

          const isClosed = isQuoteClosed(status, deadlineDate);

          if (!isClosed && isEditQuotePending) return <Spinner size="md" />;

          return (
            <>
              {isClosed ? (
                <span>-</span>
              ) : (
                <Select
                  type="basic"
                  className="w-[150px]"
                  size="sm"
                  placeholder="시간 선택"
                  options={[
                    { value: "24", label: "24시간" },
                    { value: "48", label: "48시간" },
                    { value: "72", label: "72시간" },
                  ]}
                  value={String(deadlineHours)}
                  onChange={value =>
                    editQuote({
                      deadlineHours: Number(value),
                      quoteId: info.row.original.id,
                    })
                  }
                />
              )}
            </>
          );
        },
      }),
    ];
  }, [columnHelper, editQuote, isEditQuotePending]);
  const table = useReactTable({
    data: quotesList ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <AdminRootLayout>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-[16px] mb-[36px] lg:mb-[50px]">
        <div className="flex items-center gap-[10px]">
          <h1 className="bold-heading6 lg:bold-heading5 text-primary">
            견적 관리
          </h1>

          <hr className="h-[16px] w-[1px] border-1 border-primary lg:hidden" />

          <span className="medium-body text-primary lg:hidden">
            {SOLAR_STRUCTURE_TYPE_LABELS[structureType]}
          </span>
        </div>

        <div className="flex items-center gap-[8px] lg:gap-[14px] flex-wrap">
          {Object.entries(SOLAR_INSTALLATION_TYPE_LABELS).map(
            ([value, label]) => {
              const isActive = installationType === value;
              return (
                <Fragment key={value}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-fit bold-caption lg:bold-body",
                      isActive ? "text-black" : "text-middle-gray"
                    )}
                    onClick={() =>
                      handleInstallationTypeChange(
                        value as SolarInstallationType
                      )
                    }
                  >
                    {label}
                  </Button>

                  <hr className="h-[16px] border-[0.5px] border-primary last:hidden" />
                </Fragment>
              );
            }
          )}
        </div>
      </div>

      <div className="w-full mb-[40px] lg:mb-[54px]">
        <div className="overflow-x-auto">
          <table className="w-max min-w-full table-fixed">
            <colgroup>
              {table.getHeaderGroups()[0]?.headers.map(header => (
                <col
                  key={header.id}
                  style={{
                    width: `${100 / table.getHeaderGroups()[0]?.headers.length}%`,
                  }}
                />
              ))}
            </colgroup>
            <thead className="bg-primary text-white text-nowrap">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => {
                    const isFirst = index === 0;
                    const isLast = index === headerGroup.headers.length - 1;
                    return (
                      <th
                        key={header.id}
                        className={cn(
                          "text-left box-border py-[15px] px-4 first:rounded-l-[4px] last:rounded-r-[4px]",
                          isFirst && "pl-12",
                          isLast && "pr-12"
                        )}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="bold-body">
              {table.getRowModel().rows.map(row => (
                <tr
                  key={row.id}
                  className="border-b border-border-color cursor-pointer hover:bg-light-gray transition-colors"
                >
                  {row.getVisibleCells().map((cell, index) => {
                    const isFirst = index === 0;
                    const isLast = index === row.getVisibleCells().length - 1;
                    const isDeadlineHour = cell.column.id === "deadlineHour";
                    return (
                      <td
                        key={cell.id}
                        className={cn(
                          "box-border py-[15px] px-4",
                          isFirst && "pl-12",
                          isLast && "pr-12",
                          isDeadlineHour && "relative"
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages ?? 1}
        onPageChange={handlePageChange}
      />
    </AdminRootLayout>
  );
};

export default BiddingPage;
