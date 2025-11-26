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
import {
  BasicSelectProps,
  RichOption,
  RichSelectProps,
  SelectProps,
} from "./types";
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
  const [maxTitleWidth, setMaxTitleWidth] = useState<number | undefined>(
    undefined
  );
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => selectRef.current as HTMLDivElement, []);

  // 드롭다운 위치 계산 (둘 다 Portal 사용)
  useEffect(() => {
    if (!isOpen || !selectRef.current) {
      setDropdownPosition(null);
      return;
    }

    const updatePosition = () => {
      if (!selectRef.current) return;

      const rect = selectRef.current.getBoundingClientRect();
      // rich 타입일 때는 mt-1 (4px) 간격 유지
      const marginTop = type === "rich" ? 4 : 4;
      setDropdownPosition({
        top: rect.bottom + window.scrollY + marginTop,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen, type]);

  // 외부 클릭 시 Select 닫기 (둘 다 Portal 사용)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!selectRef.current) return;

      const target = event.target as HTMLElement;
      const dropdown = document.querySelector('[data-select-dropdown="true"]');

      if (
        !selectRef.current.contains(target) &&
        (!dropdown || !dropdown.contains(target))
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // value prop 동기화
  useEffect(() => {
    setSelectedValue(value || "");
  }, [value]);

  // rich일 때 title width 계산
  useEffect(() => {
    if (type !== "rich") return;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return;

    context.font = "700 16px Pretendard";

    let maxWidth = 0;
    options.forEach(option => {
      const titleWidth = context.measureText(
        (option as RichOption).title
      ).width;
      maxWidth = Math.max(maxWidth, titleWidth);
    });

    setMaxTitleWidth(Math.ceil(maxWidth) + 8);
  }, [options, type]);

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

      {/* 둘 다 Portal 사용 (기존 스타일 유지) */}
      {isOpen &&
        dropdownPosition &&
        typeof window !== "undefined" &&
        createPortal(
          <div
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
                  maxTitleWidth={maxTitleWidth}
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
