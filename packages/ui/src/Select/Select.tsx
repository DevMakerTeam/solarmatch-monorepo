import { cn } from "@repo/utils";
import {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Icon } from "../Icon";
import SelectLabel from "./components/SelectLabel";
import SelectOption from "./components/SelectOption";
import { BasicSelectProps, RichSelectProps, SelectProps } from "./types";
import { getPaddingClasses, getSizeClasses } from "./utils";

function Select(props: SelectProps, ref: ForwardedRef<HTMLDivElement>) {
  const {
    options,
    value,
    onChange,
    placeholder,
    disabled,
    className,
    size = "lg",
    type,
    ...restProps
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollLockRef = useRef<number | null>(null);

  useImperativeHandle(ref, () => selectRef.current as HTMLDivElement, []);

  // 드롭다운 위치 계산 (Radix UI 스타일)
  useEffect(() => {
    if (!isOpen || !selectRef.current) {
      setDropdownPosition(null);
      return;
    }

    const updatePosition = () => {
      if (!selectRef.current) return;

      const rect = selectRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const spacing = 4;
      const minTopMargin = 8; // 상단 최소 여백 (뷰포트 경계 방지용)

      // 아래로 열기: 드롭다운 상단 = Select 하단 + spacing (간격: spacing)
      let top = rect.bottom + window.scrollY + spacing;
      let left = rect.left + window.scrollX;
      const width = rect.width;

      // 하단 공간 체크 및 자동 조정
      const dropdownHeight = contentRef.current?.scrollHeight || 240;
      const spaceBelow = viewportHeight - rect.bottom;

      if (spaceBelow < dropdownHeight) {
        // 위로 열기: 드롭다운 하단 = Select 상단 - spacing (간격: spacing)
        // 드롭다운 상단 = Select 상단 - dropdownHeight - spacing
        const selectTop = rect.top + window.scrollY;
        const calculatedTop = selectTop - dropdownHeight - spacing;

        // 뷰포트 상단 경계만 체크 (최소 여백)
        const minTopAbsolute = window.scrollY + minTopMargin;
        top = Math.max(minTopAbsolute, calculatedTop);
      }

      // 좌우 경계 체크
      if (left + width > viewportWidth) {
        left = Math.max(0, viewportWidth - width);
      }
      if (left < 0) {
        left = 0;
      }

      setDropdownPosition({ top, left, width });
    };

    // 첫 렌더링 후 위치 계산
    const frameId = requestAnimationFrame(() => {
      updatePosition();
      // 드롭다운이 렌더링된 후 한 번 더 업데이트 (실제 높이 반영)
      setTimeout(updatePosition, 0);
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isOpen]);

  // 스크롤 잠금 (Radix UI 스타일)
  useEffect(() => {
    if (!isOpen) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    scrollLockRef.current = scrollY;

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = originalStyle;

      if (scrollLockRef.current !== null) {
        window.scrollTo(0, scrollLockRef.current);
        scrollLockRef.current = null;
      }
    };
  }, [isOpen]);

  // Escape 키로 닫기
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  // 외부 클릭 시 Select 닫기 (Radix UI 스타일)
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      const content = contentRef.current;

      if (selectRef.current?.contains(target) || content?.contains(target)) {
        return;
      }

      setIsOpen(false);
    };

    // pointerdown을 사용 (Radix UI 스타일)
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  // value prop 동기화
  useEffect(() => {
    setSelectedValue(value || "");
  }, [value]);

  const handleOptionSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    onChange?.(value);
  };

  const baseClassName = cn(
    `
    relative w-full min-w-0 bg-white border border-border-color rounded-[12px] 
    focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500
  `,
    getSizeClasses(size),
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
    className
  );

  const selectedLabel = (
    <SelectLabel
      selectedValue={selectedValue}
      options={options}
      type={type}
      placeholder={placeholder}
      labelClassName={
        type === "basic"
          ? (restProps as BasicSelectProps).labelClassName
          : undefined
      }
      titleClassName={
        type === "rich"
          ? (restProps as RichSelectProps).titleClassName
          : undefined
      }
      descriptionClassName={
        type === "rich"
          ? (restProps as RichSelectProps).descriptionClassName
          : undefined
      }
    />
  );

  return (
    <div ref={selectRef} className={baseClassName}>
      <div
        className={cn(
          getPaddingClasses(size),
          "flex items-center justify-between h-full"
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div
          className={cn(
            "flex-1 min-w-0",
            !selectedValue ? "text-gray-500" : "text-gray-900"
          )}
        >
          {typeof selectedLabel === "string" ? (
            <span className="block truncate">{selectedLabel}</span>
          ) : (
            selectedLabel
          )}
        </div>
        <Icon
          iconName="chevronDown"
          className={cn(
            "text-black w-[11.5px] transition-transform duration-200 ml-2",
            isOpen ? "rotate-180" : ""
          )}
        />
      </div>

      {isOpen &&
        dropdownPosition &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            ref={contentRef}
            data-select-dropdown="true"
            className={cn(
              "fixed bg-white max-h-60 rounded-[12px] text-base border border-border-color focus:outline-none overflow-hidden",
              type === "rich" ? "z-10" : "z-[10] shadow-lg"
            )}
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`,
            }}
          >
            <div className="py-1 overflow-auto max-h-60">
              {options.map(option => (
                <SelectOption
                  key={option.value}
                  option={option}
                  selectedValue={selectedValue}
                  onSelect={handleOptionSelect}
                  type={type}
                  size={size}
                  labelClassName={
                    type === "basic"
                      ? (restProps as BasicSelectProps).labelClassName
                      : undefined
                  }
                  titleClassName={
                    type === "rich"
                      ? (restProps as RichSelectProps).titleClassName
                      : undefined
                  }
                  descriptionClassName={
                    type === "rich"
                      ? (restProps as RichSelectProps).descriptionClassName
                      : undefined
                  }
                />
              ))}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

export default forwardRef<HTMLDivElement, SelectProps>(Select);
