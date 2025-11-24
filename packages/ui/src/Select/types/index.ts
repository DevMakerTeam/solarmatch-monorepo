// 기본 옵션 타입
export interface BasicOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// Rich 옵션 타입 (title + description)
export interface RichOption {
  value: string;
  title: string;
  description: string;
  disabled?: boolean;
}

// Size 타입 정의
export type SelectSize = "sm" | "lg";

// 기본 Select Props
export interface BasicSelectProps {
  type: "basic";
  options: BasicOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  size?: SelectSize;
  labelClassName?: string;
}

// Rich Select Props
export interface RichSelectProps {
  type: "rich";
  options: RichOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  size?: SelectSize;
  titleClassName?: string;
  descriptionClassName?: string;
}

export type SelectProps = BasicSelectProps | RichSelectProps;
