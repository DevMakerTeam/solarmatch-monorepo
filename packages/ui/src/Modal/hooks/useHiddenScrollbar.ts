import { useEffect } from "react";

const useHiddenScrollbar = () => {
  useEffect(() => {
    // 스크롤바 너비 계산
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // 기존 스타일 저장
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // fixed 헤더 찾기
    const header = document.getElementById("layout-header");
    const originalHeaderPaddingRight = header?.style.paddingRight || "";

    // 스크롤 막기 + 레이아웃 흔들림 방지
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      // 헤더에도 padding 적용
      if (header) {
        const currentPadding = parseInt(
          window.getComputedStyle(header).paddingRight || "0"
        );
        header.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
      }
    }

    // 모달이 닫힐 때 원래대로 복구
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;

      // 헤더 복구
      if (header) {
        header.style.paddingRight = originalHeaderPaddingRight;
      }
    };
  }, []);
};

export default useHiddenScrollbar;
