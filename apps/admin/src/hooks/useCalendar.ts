import React from "react";
import dayjs, { Dayjs } from "dayjs"; // Dayjs 타입 import
import "dayjs/locale/ko";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

// Day.js 플러그인 로드
dayjs.extend(weekday);
dayjs.extend(localeData);

// 상수 정의
const CALENDAR_LENGTH: number = 42;
const DEFAULT_TRASH_VALUE: number = 0;
const DAY_OF_WEEK: number = 7;

// useCalendar 훅의 반환 값 타입 정의
interface UseCalendarResult {
  /** 7x6 (주간) 형태로 정리된 달력 날짜 목록 (0은 더미) */
  weekCalendarList: number[][];
  /** 현재 달력의 기준 날짜 (JS Date 객체) */
  currentDate: Date;
  /** 현재 달력의 기준 날짜 (Dayjs 인스턴스) */
  currentDayjs: Dayjs;
  /** 이전 달로 이동하는 함수 */
  goToPrevMonth: () => void;
  /** 다음 달로 이동하는 함수 */
  goToNextMonth: () => void;
  /** 특정 년도로 이동하는 함수 */
  goToYear: (year: number) => void;
  /** 특정 월로 이동하는 함수 */
  goToMonth: (month: number) => void;
}

const useCalendar = (): UseCalendarResult => {
  // 상태는 Dayjs 타입으로 관리
  const [currentDayjs, setCurrentDayjs] = React.useState<Dayjs>(dayjs());

  // 현재 월의 1일 Dayjs 인스턴스
  const firstDayOfMonth: Dayjs = currentDayjs.startOf("month");

  // 현재 월의 총 일수
  const totalMonthDays: number = currentDayjs.daysInMonth();

  // 1일의 요일 인덱스 (0: 일, 1: 월, ..., 6: 토)
  const startDayIndex: number = firstDayOfMonth.day();

  // 1. prevDayList: 이전 달 날짜 칸을 채울 더미
  const prevDayList: number[] = Array.from({
    length: startDayIndex,
  }).map(() => DEFAULT_TRASH_VALUE);

  // 2. currentDayList: 현재 월의 날짜
  const currentDayList: number[] = [...Array(totalMonthDays)].map(
    (_, i) => i + 1
  );

  // 3. nextDayList: 다음 달 날짜 칸을 채울 더미
  const nextDayList: number[] = Array.from({
    length: CALENDAR_LENGTH - currentDayList.length - prevDayList.length,
  }).map(() => DEFAULT_TRASH_VALUE);

  // 4. 모든 날짜 리스트를 병합 (총 42개)
  const currentCalendarList: number[] = prevDayList.concat(
    currentDayList,
    nextDayList
  );

  // 5. 주 단위(7일)로 분할
  // acc의 초기값에 명시적인 타입 단언 `[] as number[][]` 또는 제네릭 사용
  const weekCalendarList: number[][] = currentCalendarList.reduce<number[][]>(
    (acc, cur, idx) => {
      const chunkIndex: number = Math.floor(idx / DAY_OF_WEEK);
      if (!acc[chunkIndex]) {
        acc[chunkIndex] = [];
      }
      acc[chunkIndex].push(cur);
      return acc;
    },
    []
  );

  // 이전 달로 이동 함수
  const goToPrevMonth = React.useCallback((): void => {
    setCurrentDayjs(prev => prev.subtract(1, "month"));
  }, []);

  // 다음 달로 이동 함수
  const goToNextMonth = React.useCallback((): void => {
    setCurrentDayjs(prev => prev.add(1, "month"));
  }, []);

  // 특정 년도로 이동 함수
  const goToYear = React.useCallback((year: number): void => {
    setCurrentDayjs(prev => prev.year(year));
  }, []);

  // 특정 월로 이동 함수 (1-12)
  const goToMonth = React.useCallback((month: number): void => {
    setCurrentDayjs(prev => prev.month(month - 1));
  }, []);

  return {
    weekCalendarList,
    currentDate: currentDayjs.toDate(), // JS Date 객체로 반환
    currentDayjs,
    goToPrevMonth,
    goToNextMonth,
    goToYear,
    goToMonth,
  };
};

export default useCalendar;
