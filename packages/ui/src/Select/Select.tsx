import { cn } from "@repo/utils";
import {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Icon } from "../Icon";
import SelectLabel from "./components/SelectLabel";
import SelectOption from "./components/SelectOption";
import { RichOption, SelectProps } from "./types";
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
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");
  const [maxTitleWidth, setMaxTitleWidth] = useState<number | undefined>(
    undefined
  );
  const selectRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => selectRef.current as HTMLDivElement, []);

  // 외부 클릭 시 Select 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white max-h-60 rounded-[12px] text-base border border-border-color focus:outline-none overflow-hidden">
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
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default forwardRef<HTMLDivElement, SelectProps>(Select);
