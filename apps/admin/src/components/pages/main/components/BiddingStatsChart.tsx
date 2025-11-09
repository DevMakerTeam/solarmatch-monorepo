import { Fragment, useMemo, useState } from "react";

export type ChartRange = "daily" | "weekly" | "monthly";

export type ChartDatum = {
  label: string;
  value: number;
};

type BiddingStatsChartProps = {
  title: string;
  data: Record<ChartRange, ChartDatum[]>;
  initialRange?: ChartRange;
};

const RANGE_TABS: { label: string; value: ChartRange }[] = [
  { label: "일간", value: "daily" },
  { label: "주간", value: "weekly" },
  { label: "월간", value: "monthly" },
];

const GRID_LEVELS = 4;

const BiddingStatsChart = ({
  title,
  data,
  initialRange = "daily",
}: BiddingStatsChartProps) => {
  const [activeRange, setActiveRange] = useState<ChartRange>(initialRange);

  const activeData = useMemo(() => data[activeRange], [activeRange, data]);

  const maxValue = useMemo(() => {
    const highest = Math.max(...activeData.map(item => item.value), 0);
    return highest === 0 ? 1 : highest;
  }, [activeData]);

  const gridLabels = useMemo(() => {
    return Array.from({ length: GRID_LEVELS + 1 }, (_, index) => {
      const ratio = 1 - index / GRID_LEVELS;
      return Math.round(maxValue * ratio);
    });
  }, [maxValue]);

  const zeroLabel = gridLabels[gridLabels.length - 1];
  const gridTicks = gridLabels.slice(0, -1);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between gap-[12px] mb-[35px] lg:mb-[28px]">
        <span className="bold-heading6 text-primary">{title}</span>
        <div className="flex items-center gap-[12px]">
          {RANGE_TABS.map((range, index) => {
            const isActive = activeRange === range.value;
            return (
              <Fragment key={range.value}>
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
                  onClick={() => setActiveRange(range.value)}
                  className={`bold-body transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? "text-primary"
                      : "text-primary/40 hover:text-primary"
                  }`}
                >
                  {range.label}
                </button>
              </Fragment>
            );
          })}
        </div>
      </div>

      <div className="flex h-[240px] w-full flex-col">
        <div className="relative flex-1">
          <div className="absolute inset-0 flex">
            <div className="flex w-[28px] flex-col justify-between text-center text-xs text-[#0A0A0A]">
              {gridTicks.map(label => (
                <span key={label}>{label}</span>
              ))}
              <span>{zeroLabel}</span>
            </div>
            <div className="flex-1 flex flex-col justify-between">
              {gridTicks.map(label => (
                <div
                  key={label}
                  className="h-[1px] w-full border-t border-primary/10"
                />
              ))}
              <div className="h-[1px] w-full border-t border-primary" />
            </div>
          </div>

          <div className="relative z-[1] flex h-full w-full items-end gap-[8px] pl-[28px] pr-[8px] pb-[1px] lg:gap-[16px] lg:pl-[40px] lg:pr-[12px]">
            {activeData.map((item, index) => {
              const normalized = item.value / maxValue;
              const barHeight = normalized * 100;
              const isPrimary = index % 2 === 0;

              return (
                <div
                  key={item.label}
                  className="flex h-full flex-1 items-end justify-center"
                >
                  <div
                    className={`w-[20px] transition-all duration-200 lg:w-[50px] ${
                      item.value === 0
                        ? "bg-transparent"
                        : isPrimary
                          ? "bg-primary"
                          : "bg-primary/30"
                    }`}
                    style={{ height: `${barHeight}%` }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-[8px] flex w-full gap-[8px] pl-[28px] pr-[8px] lg:gap-[16px] lg:pl-[40px] lg:pr-[12px]">
        {activeData.map(item => (
          <span
            key={item.label}
            className="flex-1 text-center text-xs font-semibold text-primary/80 lg:text-sm"
          >
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BiddingStatsChart;
