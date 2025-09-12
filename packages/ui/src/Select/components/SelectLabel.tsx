import { BasicOption, RichOption, SelectProps } from "../types";

interface Props {
  selectedValue: string;
  options: (BasicOption | RichOption)[];
  type: SelectProps["type"];
  placeholder?: string;
}

function SelectLabel({ selectedValue, options, type, placeholder }: Props) {
  if (!selectedValue) return placeholder || "Select an option";

  const selectedOption = options.find(option => option.value === selectedValue);
  if (!selectedOption) return placeholder || "Select an option";

  if (type === "basic") {
    return (
      <span className="bold-body">{(selectedOption as BasicOption).label}</span>
    );
  } else {
    const richOption = selectedOption as RichOption;
    return (
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <span className="bold-body flex-shrink-0">{richOption.title}</span>
        <span className="medium-small text-gray-500 truncate flex-1 min-w-0">
          {richOption.description}
        </span>
      </div>
    );
  }
}

export default SelectLabel;
