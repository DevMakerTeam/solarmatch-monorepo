import { cn, getCurrentBreakpoint } from "@repo/utils";
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: "left" | "right" | "top" | "bottom";
  size?: string | number;
  widthRatio?: number;
  heightRatio?: number;
  responsiveWidthRatio?: { mobile?: number; tablet?: number; desktop?: number };
  responsiveHeightRatio?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  minSize?: number;
  maxSize?: number;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  children: React.ReactNode;
  className?: string;
  overlayOpacity?: number;
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
  const [isMounted, setIsMounted] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [usePixelFallback, setUsePixelFallback] = useState(false);

  // viewport 단위 지원 체크
  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkViewportSupport = () => {
      try {
        const testEl = document.createElement("div");
        Object.assign(testEl.style, {
          position: "fixed",
          top: "0",
          left: "-9999px",
          height: "100vh",
          width: "1px",
          visibility: "hidden",
        });
        document.body.appendChild(testEl);
        const diff = Math.abs(testEl.offsetHeight - window.innerHeight);
        document.body.removeChild(testEl);
        setUsePixelFallback(diff > 10);
      } catch {
        setUsePixelFallback(true);
      }
    };
    const timer = setTimeout(checkViewportSupport, 100);
    return () => clearTimeout(timer);
  }, []);

  // 마운트/언마운트 애니메이션
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      const timer = setTimeout(() => {
        setIsVisible(true);
        setHasOpened(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setIsMounted(false), animationDuration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, animationDuration]);

  // window 크기 추적
  useLayoutEffect(() => {
    const setSize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    setSize();
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setSize, 100);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // ESC 키 닫기
  useEffect(() => {
    if (!closeOnEscape) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose, closeOnEscape]);

  // 스크롤 잠금 및 복원
  useEffect(() => {
    if (!isOpen) return;
    const scrollY = window.scrollY;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    Object.assign(document.body.style, {
      overflow: "hidden",
      position: "fixed",
      top: `-${scrollY}px`,
      width: "100%",
      paddingRight: scrollbarWidth > 0 ? `${scrollbarWidth}px` : "",
    });
    document.body.dataset.scrollY = scrollY.toString();

    return () => {
      const y = document.body.dataset.scrollY;
      Object.assign(document.body.style, {
        overflow: "",
        position: "",
        top: "",
        width: "",
        paddingRight: "",
      });
      delete document.body.dataset.scrollY;
      if (y) window.scrollTo(0, parseInt(y));
    };
  }, [isOpen]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) onClose();
    },
    [closeOnOverlayClick, onClose]
  );

  const withConstraints = useCallback(
    (expr: string) => {
      const constraints: string[] = [];
      if (minSize) constraints.push(`${minSize}px`);
      if (maxSize) constraints.push(`${maxSize}px`);
      if (constraints.length === 2)
        return `clamp(${constraints[0]}, ${expr}, ${constraints[1]})`;
      if (minSize) return `max(${constraints[0]}, ${expr})`;
      if (maxSize) return `min(${expr}, ${constraints[0]})`;
      return expr;
    },
    [minSize, maxSize]
  );

  const getResponsiveRatio = useCallback(
    (isWidth: boolean): number | undefined => {
      const responsive = isWidth ? responsiveWidthRatio : responsiveHeightRatio;
      const fallback = isWidth ? widthRatio : heightRatio;
      if (!responsive) return fallback;
      switch (getCurrentBreakpoint()) {
        case "desktop":
          return (
            responsive.desktop ??
            responsive.tablet ??
            responsive.mobile ??
            fallback
          );
        case "tablet":
          return responsive.tablet ?? responsive.mobile ?? fallback;
        default:
          return responsive.mobile ?? fallback;
      }
    },
    [responsiveWidthRatio, responsiveHeightRatio, widthRatio, heightRatio]
  );

  const calculateSize = useCallback(
    (baseSize: string | number, isWidth = true) => {
      const ratio = getResponsiveRatio(isWidth);
      if (ratio !== undefined) {
        return withConstraints(
          `calc(${isWidth ? "100vw" : "100vh"} * ${ratio})`
        );
      }
      const val = typeof baseSize === "number" ? `${baseSize}px` : baseSize;
      return withConstraints(val);
    },
    [getResponsiveRatio, withConstraints]
  );

  const positionStyles = useMemo<CSSProperties>(() => {
    const vh = usePixelFallback ? `${windowSize.height}px` : "100vh";
    const vw = usePixelFallback ? `${windowSize.width}px` : "100vw";
    const addGpu = usePixelFallback ? " translateZ(0)" : "";
    const common: CSSProperties = { willChange: "transform" };

    switch (position) {
      case "left":
        return {
          ...common,
          top: 0,
          left: 0,
          height: vh,
          width: calculateSize(size, true),
          transform:
            (isVisible ? "translateX(0)" : "translateX(-100%)") + addGpu,
        };
      case "right":
        return {
          ...common,
          top: 0,
          right: 0,
          height: vh,
          width: calculateSize(size, true),
          transform:
            (isVisible ? "translateX(0)" : "translateX(100%)") + addGpu,
        };
      case "top":
        return {
          ...common,
          top: 0,
          left: 0,
          width: vw,
          height: calculateSize(size, false),
          transform:
            (isVisible ? "translateY(0)" : "translateY(-100%)") + addGpu,
        };
      case "bottom":
        return {
          ...common,
          bottom: 0,
          left: 0,
          width: vw,
          height: calculateSize(size, false),
          transform:
            (isVisible ? "translateY(0)" : "translateY(100%)") + addGpu,
        };
      default:
        return common;
    }
  }, [position, size, isVisible, windowSize, usePixelFallback, calculateSize]);

  if (!isMounted) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      style={{
        backgroundColor: `rgba(0,0,0,${isOpen ? overlayOpacity : 0})`,
        transition: hasOpened
          ? `background-color ${animationDuration}ms cubic-bezier(0.4,0,0.2,1)`
          : "none",
      }}
      onClick={handleOverlayClick}
    >
      <div
        ref={drawerRef}
        className={cn(
          "fixed bg-white shadow-lg transition-transform",
          className
        )}
        style={{
          ...positionStyles,
          transitionDuration: `${animationDuration}ms`,
          transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
        }}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Drawer;
