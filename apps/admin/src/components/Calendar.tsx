import useCalendar from "@/hooks/useCalendar";
import { Icon } from "@repo/ui/icon";
import dayjs from "dayjs";
import { useState, useEffect } from "react";

type CalendarProps = {
  startDate?: string | null;
  endDate?: string | null;
  onDateRangeSelect?: (startDate: string, endDate: string) => void;
  onConfirm?: () => void;
};

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

type ViewMode = "calendar" | "year" | "month";

const Calendar = ({
  startDate,
  endDate,
  onDateRangeSelect,
  onConfirm,
}: CalendarProps) => {
  const {
    weekCalendarList,
    currentDayjs,
    goToPrevMonth,
    goToNextMonth,
    goToYear,
    goToMonth,
  } = useCalendar();
  const [viewMode, setViewMode] = useState<ViewMode>("calendar");

  // 시작일이 있으면 해당 월로 이동
  useEffect(() => {
    if (startDate) {
      const start = dayjs(startDate);
      goToYear(start.year());
      goToMonth(start.month() + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate]);

  const currentYear = currentDayjs.year();
  const currentMonth = currentDayjs.month() + 1;

  // 년도 목록 생성 (현재 년도 기준 ±10년)
  const generateYearList = () => {
    const todayYear = dayjs().year();
    const years: number[] = [];
    for (let i = todayYear - 10; i <= todayYear + 1; i++) {
      years.push(i);
    }
    return years;
  };

  const yearList = generateYearList();

  const isDateInRange = (day: number): boolean => {
    if (!startDate || !endDate || day === 0) return false;
    if (startDate === endDate) return false; // 시작일과 종료일이 같으면 범위 없음

    const dateStr = `${currentYear}-${String(currentMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const date = dayjs(dateStr);
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    return (
      (date.isAfter(start, "day") || date.isSame(start, "day")) &&
      (date.isBefore(end, "day") || date.isSame(end, "day"))
    );
  };

  const isStartDate = (day: number): boolean => {
    if (!startDate || day === 0) return false;
    const dateStr = `${currentYear}-${String(currentMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return dayjs(dateStr).isSame(dayjs(startDate), "day");
  };

  const isEndDate = (day: number): boolean => {
    if (!endDate || day === 0) return false;
    const dateStr = `${currentYear}-${String(currentMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return dayjs(dateStr).isSame(dayjs(endDate), "day");
  };

  const isSelectedDate = (day: number): boolean => {
    if (day === 0) return false;
    const dateStr = `${currentYear}-${String(currentMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (startDate && dayjs(dateStr).isSame(dayjs(startDate), "day"))
      return true;
    if (endDate && dayjs(dateStr).isSame(dayjs(endDate), "day")) return true;
    return false;
  };

  const isToday = (day: number): boolean => {
    if (day === 0) return false;
    const dateStr = `${currentYear}-${String(currentMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return dayjs(dateStr).isSame(dayjs(), "day");
  };

  const handleDateClick = (day: number) => {
    if (day === 0) return;

    const dateStr = `${currentYear}-${String(currentMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    if (!onDateRangeSelect) return;

    // props의 startDate와 endDate를 명확하게 참조
    const currentStart = startDate;
    const currentEnd = endDate;
    const hasStart = !!currentStart;
    const hasEnd = !!currentEnd;

    // 둘 다 없으면 시작일만 설정
    if (!hasStart && !hasEnd) {
      onDateRangeSelect(dateStr, "");
      return;
    }

    // 둘 다 있으면 범위 확장/연장 로직
    if (hasStart && hasEnd) {
      const start = dayjs(currentStart!);
      const end = dayjs(currentEnd!);
      const clicked = dayjs(dateStr);

      // 클릭한 날짜가 시작일보다 이전이면 시작일 확장
      if (clicked.isBefore(start, "day")) {
        onDateRangeSelect(dateStr, currentEnd!);
      }
      // 클릭한 날짜가 종료일보다 이후면 종료일 연장
      else if (clicked.isAfter(end, "day")) {
        onDateRangeSelect(currentStart!, dateStr);
      }
      // 범위 내에 있으면 새로운 범위 시작
      else {
        onDateRangeSelect(dateStr, "");
      }
      return;
    }

    // 시작일만 있으면 종료일 설정
    if (hasStart && !hasEnd) {
      const start = dayjs(currentStart!);
      const clicked = dayjs(dateStr);
      if (clicked.isBefore(start, "day")) {
        // 클릭한 날짜가 시작일보다 이전이면 시작일과 종료일 교체
        onDateRangeSelect(dateStr, currentStart!);
      } else {
        // 클릭한 날짜가 시작일보다 이후거나 같으면 종료일로 설정
        onDateRangeSelect(currentStart!, dateStr);
      }
    }
  };

  const handleYearClick = (year: number) => {
    goToYear(year);
    setViewMode("month");
  };

  const handleMonthClick = (month: number) => {
    goToMonth(month);
    setViewMode("calendar");
  };

  const handleConfirmClick = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* 헤더: 이전/다음 버튼과 현재 년월 */}
      <div className="flex items-center justify-between mb-[16px]">
        <button
          type="button"
          onClick={goToPrevMonth}
          className="flex items-center justify-center w-[32px] h-[32px] rounded-[4px] hover:bg-primary/10 transition-colors cursor-pointer"
          aria-label="이전 달"
        >
          <Icon iconName="chevronLeft" className="w-4 h-4 text-primary" />
        </button>

        <div className="flex items-center gap-[4px]">
          <button
            type="button"
            onClick={() => setViewMode("year")}
            className="bold-body text-primary hover:opacity-80 transition-opacity cursor-pointer"
          >
            {currentYear}년
          </button>
          <button
            type="button"
            onClick={() => setViewMode("month")}
            className="bold-body text-primary hover:opacity-80 transition-opacity cursor-pointer"
          >
            {currentMonth}월
          </button>
        </div>

        <button
          type="button"
          onClick={goToNextMonth}
          className="flex items-center justify-center w-[32px] h-[32px] rounded-[4px] hover:bg-primary/10 transition-colors cursor-pointer"
          aria-label="다음 달"
        >
          <Icon iconName="chevronRight" className="w-4 h-4 text-primary" />
        </button>
      </div>

      {/* 년도 선택 그리드 */}
      {viewMode === "year" && (
        <div className="grid grid-cols-3 gap-[4px] mb-[16px]">
          {yearList.map(year => {
            const isSelected = year === currentYear;
            return (
              <button
                key={year}
                type="button"
                onClick={() => handleYearClick(year)}
                className={`
                  flex items-center justify-center h-[40px] text-sm font-medium rounded-[4px] transition-colors
                  cursor-pointer hover:bg-primary/10
                  ${isSelected ? "bg-primary text-white" : "text-primary/80"}
                `}
              >
                {year}년
              </button>
            );
          })}
        </div>
      )}

      {/* 월 선택 그리드 */}
      {viewMode === "month" && (
        <div className="grid grid-cols-3 gap-[4px] mb-[16px]">
          {MONTHS.map(month => {
            const isSelected = month === currentMonth;
            return (
              <button
                key={month}
                type="button"
                onClick={() => handleMonthClick(month)}
                className={`
                  flex items-center justify-center h-[40px] text-sm font-medium rounded-[4px] transition-colors
                  cursor-pointer hover:bg-primary/10
                  ${isSelected ? "bg-primary text-white" : "text-primary/80"}
                `}
              >
                {month}월
              </button>
            );
          })}
        </div>
      )}

      {/* 날짜 그리드 */}
      {viewMode === "calendar" && (
        <>
          {/* 요일 헤더 */}
          <div className="grid grid-cols-7 gap-[4px] mb-[8px]">
            {WEEKDAYS.map(day => (
              <div
                key={day}
                className="flex items-center justify-center h-[32px] text-xs font-semibold text-primary/60"
              >
                {day}
              </div>
            ))}
          </div>

          {/* 날짜 그리드 */}
          <div className="grid grid-cols-7 gap-0 mb-[16px]">
            {weekCalendarList.map((week, weekIndex) =>
              week.map((day, dayIndex) => {
                const isDummy = day === 0;
                const inRange = isDateInRange(day);
                const isStart = isStartDate(day);
                const isEnd = isEndDate(day);
                const isSelected = isSelectedDate(day);
                const today = isToday(day);

                // 범위 스타일 결정
                let rangeStyle = "";
                let bgColor = "";
                let circleBg = "";
                let leftBg = "";
                let rightBg = "";

                if (isStart && isEnd) {
                  // 시작일과 종료일이 같은 경우 (단일 날짜 선택)
                  rangeStyle = "rounded-full";
                  bgColor = "bg-black text-white";
                } else if (isStart) {
                  // 시작일: 오른쪽만 회색 배경 + 동그란 검정 원
                  rightBg = "bg-light-gray";
                  circleBg = "bg-black text-white rounded-full";
                } else if (isEnd) {
                  // 종료일: 왼쪽만 회색 배경 + 동그란 검정 원
                  leftBg = "bg-light-gray";
                  circleBg = "bg-black text-white rounded-full";
                } else if (inRange) {
                  // 범위 내 중간 날짜: 둥글지 않음
                  rangeStyle = "";
                  bgColor = "bg-light-gray text-primary/80";
                } else if (!isDummy) {
                  bgColor = "text-primary/80";
                }

                return (
                  <button
                    key={`${weekIndex}-${dayIndex}`}
                    type="button"
                    onClick={() => handleDateClick(day)}
                    disabled={isDummy}
                    className={`
                      relative flex items-center justify-center h-[32px] text-xs font-medium transition-colors
                      ${isDummy ? "cursor-default" : "cursor-pointer hover:bg-primary/10"}
                      ${bgColor}
                      ${today && !isSelected && !inRange ? "font-bold" : ""}
                      ${rangeStyle}
                    `}
                  >
                    {isDummy ? (
                      ""
                    ) : (
                      <>
                        {leftBg && (
                          <span
                            className={`absolute left-0 top-0 bottom-0 w-1/2 ${leftBg}`}
                          />
                        )}
                        {rightBg && (
                          <span
                            className={`absolute right-0 top-0 bottom-0 w-1/2 ${rightBg}`}
                          />
                        )}
                        {circleBg && (
                          <span
                            className={`
                            absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                            flex items-center justify-center
                            w-[32px] h-[32px]
                            ${circleBg}
                          `}
                          >
                            {day}
                          </span>
                        )}
                        {!circleBg && day}
                      </>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </>
      )}

      {/* 푸터: 확인 버튼 */}
      <div className="flex items-center justify-end pt-[16px] border-t border-primary/10">
        <button
          type="button"
          onClick={handleConfirmClick}
          className="text-sm font-medium text-primary hover:opacity-80 transition-opacity cursor-pointer"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default Calendar;
