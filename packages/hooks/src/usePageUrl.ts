import { useRouter } from "next/router";
import { useCallback } from "react";

export interface UsePageUrlProps {
  /** URL에 page 파라미터가 없을 때 사용할 기본 페이지 (기본값: 1) */
  defaultPage?: number;
  /** 페이지 변경 시 스크롤을 최상단으로 이동할지 여부 (기본값: true) */
  scrollToTop?: boolean;
}

/**
 * URL의 page 쿼리 파라미터를 관리하는 Hook
 *
 * @description
 * - 1페이지: /path (page 파라미터 없음)
 * - 2페이지 이상: /path?page=N
 * - shallow routing으로 페이지 새로고침 없이 URL만 변경
 *
 * @example
 * ```tsx
 * const { currentPage, handlePageChange } = usePageUrl({ defaultPage: 1 });
 *
 * <Pagination
 *   currentPage={currentPage}
 *   onPageChange={handlePageChange}
 * />
 * ```
 */
export const usePageUrl = (options: UsePageUrlProps = {}) => {
  const { defaultPage = 1, scrollToTop = true } = options;
  const router = useRouter();

  // URL에서 page 읽기 (없으면 defaultPage = 1)
  const currentPage = router.query.page
    ? Number(router.query.page)
    : defaultPage;

  // page 변경 함수
  const handlePageChange = useCallback(
    (page: number) => {
      if (page === currentPage) return;

      // 1page로 가는 경우 page 파라미터 제거
      if (page === 1) {
        const { page: _, ...restQuery } = router.query;
        router.push(
          {
            pathname: router.pathname,
            query: restQuery,
          },
          undefined,
          { shallow: true, scroll: scrollToTop }
        );
      } else {
        // 2page 이상은 page 파라미터 추가
        router.push(
          {
            pathname: router.pathname,
            query: { ...router.query, page },
          },
          undefined,
          { shallow: true, scroll: scrollToTop }
        );
      }
    },
    [router, currentPage, scrollToTop]
  );

  return {
    currentPage,
    handlePageChange,
  };
};
