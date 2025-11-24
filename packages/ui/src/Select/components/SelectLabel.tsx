import { cn } from "@repo/utils";
import { BasicOption, RichOption, SelectProps } from "../types";

interface SelectLabelProps {
  selectedValue: string;
  options: (BasicOption | RichOption)[];
  type: SelectProps["type"];
  placeholder?: string;
  labelClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

function SelectLabel({
  selectedValue,
  options,
  type,
  placeholder,
  labelClassName,
  titleClassName,
  descriptionClassName,
}: SelectLabelProps) {
  if (!selectedValue) return placeholder || "Select an option";

  const selectedOption = options.find(option => option.value === selectedValue);
  if (!selectedOption) return placeholder || "Select an option";

  if (type === "basic") {
    return (
      <span className={cn("bold-body", labelClassName)}>
        {(selectedOption as BasicOption).label}
      </span>
    );
  } else {
    const richOption = selectedOption as RichOption;
    return (
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <span className={cn("bold-body flex-shrink-0", titleClassName)}>
          {richOption.title}
        </span>
        <span
          className={cn(
            "medium-small text-gray-500 truncate flex-1 min-w-0",
            descriptionClassName
          )}
        >
          {richOption.description}
        </span>
      </div>
    );
  }
}

export default SelectLabel;
