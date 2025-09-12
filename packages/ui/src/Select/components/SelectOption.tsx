import { Icon } from "../..";
import { BasicOption, RichOption, SelectProps } from "../types";
import { getPaddingClasses } from "../utils";

interface SelectOptionProps {
  option: BasicOption | RichOption;
  selectedValue: string;
  onSelect: (value: string) => void;
  type: SelectProps["type"];
  maxTitleWidth?: number;
  size?: SelectProps["size"];
}

function SelectOption({
  option,
  selectedValue,
  onSelect,
  type,
  maxTitleWidth,
  size = "lg",
}: SelectOptionProps) {
  const isSelected = option.value === selectedValue;
  const isDisabled = option.disabled;
  const padding = getPaddingClasses(size);

  const commonClass = `
    cursor-pointer select-none relative ${padding}
    ${
      isDisabled
        ? "text-gray-400 cursor-not-allowed"
        : isSelected
          ? "text-blue-600 bg-blue-50"
          : "text-gray-900 hover:bg-gray-50"
    }
  `.trim();

  return (
    <div
      key={option.value}
      className={commonClass}
      onClick={() => !isDisabled && onSelect(option.value)}
      data-selected={isSelected}
    >
      {type === "basic" ? (
        <>
          <span className="bold-body block truncate">
            {(option as BasicOption).label}
          </span>
          {isSelected && (
            <span className="absolute inset-y-0 right-0 flex items-center pr-4">
              <Icon iconName="check" className="h-5 w-5 text-secondary" />
            </span>
          )}
        </>
      ) : (
        <div className="flex items-start justify-between w-full">
          <div className="flex-1 min-w-0 pr-2">
            <div className="flex items-start gap-3">
              <span
                className="bold-body whitespace-nowrap flex-shrink-0"
                style={{
                  width: maxTitleWidth ? `${maxTitleWidth}px` : "auto",
                }}
              >
                {(option as RichOption).title}
              </span>
              <span className="medium-small text-gray-500 leading-relaxed flex-1">
                {(option as RichOption).description}
              </span>
            </div>
          </div>
          {isSelected && (
            <div className="flex items-center ml-3 flex-shrink-0">
              <Icon iconName="check" className="h-5 w-5 text-secondary" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SelectOption;
