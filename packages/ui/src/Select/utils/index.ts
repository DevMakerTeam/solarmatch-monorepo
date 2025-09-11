import { SelectSize } from "../types";

// Size에 따른 높이 클래스 반환
export const getSizeClasses = (size: SelectSize = "lg") => {
  return size === "sm" ? "h-[40px]" : "h-[50px]";
};

// Size에 따른 패딩 클래스 반환
export const getPaddingClasses = (size: SelectSize = "lg") => {
  return size === "sm" ? "px-[22px] py-[8px]" : "px-[22px] py-[14px]";
};
