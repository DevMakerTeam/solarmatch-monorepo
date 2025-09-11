"use client";

import { cn, getCurrentBreakpoint } from "@repo/utils";
import React, { useEffect, useRef, useState } from "react";

export interface DrawerProps {
  /**
   * Drawer가 열려있는지 여부
   */
  isOpen: boolean;
  /**
   * Drawer를 닫을 때 호출되는 콜백
   */
  onClose: () => void;
  /**
   * Drawer의 위치 (left, right, top, bottom)
   */
  position?: "left" | "right" | "top" | "bottom";
  /**
   * Drawer의 크기 (px 또는 %)
   * widthRatio/heightRatio가 설정된 경우 무시됨
   */
  size?: string | number;
  /**
   * Drawer의 너비 비율 (0-1, 예: 0.8 = 화면의 80%)
   * left/right position일 때만 적용
   */
  widthRatio?: number;
  /**
   * Drawer의 높이 비율 (0-1, 예: 0.6 = 화면의 60%)
   * top/bottom position일 때만 적용
   */
  heightRatio?: number;
  /**
   * 반응형 너비 비율 설정
   * { mobile: 0.9, tablet: 0.7, desktop: 0.5 }
   */
  responsiveWidthRatio?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  /**
   * 반응형 높이 비율 설정
   * { mobile: 0.8, tablet: 0.6, desktop: 0.4 }
   */
  responsiveHeightRatio?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  /**
   * 최소 크기 (px)
   */
  minSize?: number;
  /**
   * 최대 크기 (px)
   */
  maxSize?: number;
  /**
   * 오버레이 클릭 시 닫기 여부
   */
  closeOnOverlayClick?: boolean;
  /**
   * ESC 키로 닫기 여부
   */
  closeOnEscape?: boolean;
  /**
   * Drawer 내용
   */
  children: React.ReactNode;
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  /**
   * 오버레이의 투명도 (0-1)
   */
  overlayOpacity?: number;
  /**
   * 애니메이션 지속시간 (ms)
   */
  animationDuration?: number;
}

export function Drawer({
  isOpen,
  onClose,
  position = "right",
  size = "320px",
  widthRatio,
  heightRatio,
  responsiveWidthRatio,
  responsiveHeightRatio,
  minSize = 200,
  maxSize,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  children,
  className,
  overlayOpacity = 0.5,
  animationDuration = 300,
}: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [windowSize, setWindowSize] = useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  }));

  // 마운트/언마운트 애니메이션 처리
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      // RAF를 사용하여 더 부드러운 애니메이션
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsVisible(true));
      });
      return () => cancelAnimationFrame(raf);
    } else {
      setIsVisible(false);
      // 애니메이션이 끝난 후 언마운트
      const timer = setTimeout(() => setIsMounted(false), animationDuration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, animationDuration]);

  // window resize 이벤트 핸들러 (반응형 크기 업데이트)
  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;

    const handleResize = () => {
      // debounce resize 이벤트
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 100);
    };

    // 초기 크기 설정 (SSR 대응)
    if (typeof window !== "undefined") {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // resize 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // ESC 키 이벤트 핸들러
  useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose, closeOnEscape]);

  // 스크롤 방지 및 레이아웃 shift 방지
  useEffect(() => {
    if (isOpen) {
      // 현재 스크롤 위치 저장
      const scrollY = window.scrollY;

      // 현재 스크롤바 너비 계산
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      // body에 overflow hidden 적용하고 스크롤바 너비만큼 padding 추가
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      // 스크롤 위치를 data attribute에 저장
      document.body.setAttribute("data-scroll-y", scrollY.toString());
    } else {
      // 스크롤 위치 복원
      const scrollY = document.body.getAttribute("data-scroll-y");

      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.paddingRight = "";
      document.body.removeAttribute("data-scroll-y");

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY));
      }
    }

    return () => {
      const scrollY = document.body.getAttribute("data-scroll-y");

      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.paddingRight = "";
      document.body.removeAttribute("data-scroll-y");

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY));
      }
    };
  }, [isOpen]);

  // 오버레이 클릭 핸들러
  const handleOverlayClick = (event: React.MouseEvent) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  // 반응형 비율 계산
  const getResponsiveRatio = (isWidth: boolean): number | undefined => {
    const responsiveRatio = isWidth
      ? responsiveWidthRatio
      : responsiveHeightRatio;
    const fallbackRatio = isWidth ? widthRatio : heightRatio;

    if (!responsiveRatio) return fallbackRatio;

    // 현재 브레이크포인트에 맞는 비율 반환
    const currentBreakpoint = getCurrentBreakpoint();

    switch (currentBreakpoint) {
      case "desktop":
        return (
          responsiveRatio.desktop ??
          responsiveRatio.tablet ??
          responsiveRatio.mobile ??
          fallbackRatio
        );
      case "tablet":
        return (
          responsiveRatio.tablet ?? responsiveRatio.mobile ?? fallbackRatio
        );
      case "mobile":
      default:
        return responsiveRatio.mobile ?? fallbackRatio;
    }
  };

  // 크기 계산 로직
  const calculateSize = (
    baseSize: string | number,
    ratio?: number,
    isWidth: boolean = true
  ): string => {
    const effectiveRatio = ratio ?? getResponsiveRatio(isWidth);

    // 반응형 비율이 설정된 경우 현재 브레이크포인트에 맞는 크기 계산
    if (
      (responsiveWidthRatio && isWidth) ||
      (responsiveHeightRatio && !isWidth)
    ) {
      const currentRatio = getResponsiveRatio(isWidth);

      if (currentRatio !== undefined) {
        const viewportSize = isWidth ? "100vw" : "100vh";
        const calculatedSize = `calc(${viewportSize} * ${currentRatio})`;

        // 제약 조건 적용
        const constraints = [];
        if (minSize) constraints.push(`${minSize}px`);
        if (maxSize) constraints.push(`${maxSize}px`);

        if (constraints.length === 2) {
          return `clamp(${constraints[0]}, ${calculatedSize}, ${constraints[1]})`;
        } else if (minSize) {
          return `max(${minSize}px, ${calculatedSize})`;
        } else if (maxSize) {
          return `min(${calculatedSize}, ${maxSize}px)`;
        }

        return calculatedSize;
      }
    }

    // 단일 비율이 설정된 경우
    if (effectiveRatio !== undefined) {
      const viewportSize = isWidth ? "100vw" : "100vh";
      const calculatedSize = `calc(${viewportSize} * ${effectiveRatio})`;

      // 최소/최대 크기 제한 적용
      if (minSize || maxSize) {
        const constraints = [];
        if (minSize) constraints.push(`${minSize}px`);
        if (maxSize) constraints.push(`${maxSize}px`);

        if (constraints.length === 2) {
          return `clamp(${constraints[0]}, ${calculatedSize}, ${constraints[1]})`;
        } else if (minSize) {
          return `max(${minSize}px, ${calculatedSize})`;
        } else if (maxSize) {
          return `min(${calculatedSize}, ${maxSize}px)`;
        }
      }

      return calculatedSize;
    }

    // 기본 size 사용
    const sizeValue = typeof baseSize === "number" ? `${baseSize}px` : baseSize;

    // 최소/최대 크기 제한 적용
    if (minSize || maxSize) {
      const constraints = [];
      if (minSize) constraints.push(`${minSize}px`);
      if (maxSize) constraints.push(`${maxSize}px`);

      if (constraints.length === 2) {
        return `clamp(${constraints[0]}, ${sizeValue}, ${constraints[1]})`;
      } else if (minSize) {
        return `max(${minSize}px, ${sizeValue})`;
      } else if (maxSize) {
        return `min(${sizeValue}, ${maxSize}px)`;
      }
    }

    return sizeValue;
  };

  // 위치별 스타일 설정
  const getPositionStyles = () => {
    switch (position) {
      case "left":
        return {
          top: 0,
          left: 0,
          height: "100dvh", // Dynamic viewport height for mobile
          width: calculateSize(size, widthRatio, true),
          transform: isVisible ? "translateX(0)" : "translateX(-100%)",
        };
      case "right":
        return {
          top: 0,
          right: 0,
          height: "100dvh", // Dynamic viewport height for mobile
          width: calculateSize(size, widthRatio, true),
          transform: isVisible ? "translateX(0)" : "translateX(100%)",
        };
      case "top":
        return {
          top: 0,
          left: 0,
          width: "100dvw", // Dynamic viewport width for mobile
          height: calculateSize(size, heightRatio, false),
          transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        };
      case "bottom":
        return {
          bottom: 0,
          left: 0,
          width: "100dvw", // Dynamic viewport width for mobile
          height: calculateSize(size, heightRatio, false),
          transform: isVisible ? "translateY(0)" : "translateY(100%)",
        };
      default:
        return {};
    }
  };

  if (!isMounted) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      style={{
        backgroundColor: `rgba(0, 0, 0, ${isVisible ? overlayOpacity : 0})`,
        transition: `background-color ${animationDuration}ms cubic-bezier(0.4, 0.0, 0.2, 1)`,
        height: "100dvh", // Dynamic viewport height for mobile
      }}
      onClick={handleOverlayClick}
    >
      <div
        ref={drawerRef}
        className={cn(
          "fixed bg-white shadow-lg",
          "transition-transform",
          className
        )}
        style={{
          ...getPositionStyles(),
          transitionDuration: `${animationDuration}ms`,
          transitionTimingFunction: "cubic-bezier(0.4, 0.0, 0.2, 1)",
        }}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Drawer;
