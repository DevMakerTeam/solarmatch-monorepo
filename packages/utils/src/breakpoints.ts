/**
 * 일관된 브레이크포인트 설정
 * Tailwind CSS 기본 브레이크포인트와 동일
 */
export const BREAKPOINTS = {
  mobile: 0, // 0px 이상
  tablet: 768, // 768px 이상 (md)
  desktop: 1024, // 1024px 이상 (lg)
} as const;

/**
 * CSS 미디어 쿼리 문자열
 */
export const MEDIA_QUERIES = {
  mobile: `(max-width: ${BREAKPOINTS.tablet - 1}px)`,
  tablet: `(min-width: ${BREAKPOINTS.tablet}px) and (max-width: ${BREAKPOINTS.desktop - 1}px)`,
  desktop: `(min-width: ${BREAKPOINTS.desktop}px)`,
} as const;

/**
 * 현재 화면 크기에 따른 브레이크포인트 반환
 */
export const getCurrentBreakpoint = (): keyof typeof BREAKPOINTS => {
  if (typeof window === "undefined") return "mobile";

  const width = window.innerWidth;

  if (width >= BREAKPOINTS.desktop) return "desktop";
  if (width >= BREAKPOINTS.tablet) return "tablet";
  return "mobile";
};

/**
 * 특정 브레이크포인트인지 확인
 */
export const isBreakpoint = (breakpoint: keyof typeof BREAKPOINTS): boolean => {
  return getCurrentBreakpoint() === breakpoint;
};

/**
 * 미디어쿼리 매칭 확인
 */
export const matchesMediaQuery = (query: string): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia(query).matches;
};
