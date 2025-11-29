import { useState, useId } from "react";
import dayjs from "dayjs";
import { Modal } from "@repo/ui/modal";
import Calendar from "./Calendar";
import { Icon } from "@repo/ui/icon";

type DatePickerProps = {
  startDate?: string | null;
  endDate?: string | null;
  onDateRangeChange?: (startDate: string, endDate: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

const DatePicker = ({
  startDate,
  endDate,
  onDateRangeChange,
  placeholder = "날짜를 선택하세요",
  disabled = false,
}: DatePickerProps) => {
  const inputId = useId();
  const [isOpen, setIsOpen] = useState(false);
  // Calendar 내부에서 사용할 임시 상태
  const [tempStartDate, setTempStartDate] = useState<string | null>(
    startDate ?? null
  );
  const [tempEndDate, setTempEndDate] = useState<string | null>(
    endDate ?? null
  );

  // 모달이 열릴 때 props 값을 임시 상태로 동기화
  const handleInputClick = () => {
    if (!disabled) {
      setTempStartDate(startDate ?? null);
      setTempEndDate(endDate ?? null);
      setIsOpen(true);
    }
  };

  // 날짜 범위 포맷팅: 25.11.30 ~ 25.12.07
  const formatDateRange = (
    start: string | null | undefined,
    end: string | null | undefined
  ): string => {
    if (!start && !end) return "";
    if (!start) return formatDate(end);
    if (!end) return formatDate(start);

    const startFormatted = formatDate(start);
    const endFormatted = formatDate(end);

    return `${startFormatted} ~ ${endFormatted}`;
  };

  // 날짜 포맷팅: 25.11.30
  const formatDate = (dateStr: string | null | undefined): string => {
    if (!dateStr) return "";
    const date = dayjs(dateStr);
    return date.format("YY.MM.DD");
  };

  const displayValue = formatDateRange(startDate, endDate);

  const handleDateRangeSelect = (start: string, end: string) => {
    // 임시 상태 업데이트
    setTempStartDate(start || null);
    setTempEndDate(end || null);
  };

  const handleConfirm = () => {
    // 확인 버튼 클릭 시 최종 값 전달
    if (onDateRangeChange) {
      // 시작일과 종료일이 모두 있으면 전달, 없으면 현재 값 유지
      const finalStart = tempStartDate || startDate || "";
      const finalEnd = tempEndDate || endDate || finalStart;
      onDateRangeChange(finalStart, finalEnd);
    }
    setIsOpen(false);
  };

  const handleClose = () => {
    // 모달 닫을 때 임시 상태 초기화
    setTempStartDate(startDate ?? null);
    setTempEndDate(endDate ?? null);
    setIsOpen(false);
  };

  return (
    <>
      <div
        className="relative flex items-center gap-[10px] px-[12px] py-[8px] w-fit border-1 border-border-color cursor-pointer rounded-[4px] hover:bg-light-gray"
        onClick={handleInputClick}
      >
        <input
          type="text"
          value={displayValue}
          placeholder={placeholder}
          readOnly
          disabled={disabled}
          className="cursor-pointer medium-caption focus:ring-0 focus:outline-none"
          autoComplete="off"
          id={inputId}
        />

        <Icon
          iconName="calendar"
          className="w-[20px] h-[20px] text-border-color"
        />
      </div>

      {isOpen && (
        <Modal
          onClose={handleClose}
          modalContainerClassName="min-w-[320px] lg:min-w-[400px] max-w-[90vw] w-fit"
          modalContentClassName="pt-[25px] md:pt-[25px]"
          isCloseButtonVisible={false}
        >
          <Calendar
            startDate={tempStartDate ?? undefined}
            endDate={tempEndDate ?? undefined}
            onDateRangeSelect={handleDateRangeSelect}
            onConfirm={handleConfirm}
          />
        </Modal>
      )}
    </>
  );
};

export default DatePicker;
