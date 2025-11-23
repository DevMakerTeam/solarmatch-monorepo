import { ChangeEvent, InputHTMLAttributes } from "react";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";

export const formatNumberInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  field: ControllerRenderProps<TFieldValues, TName>
): ControllerRenderProps<TFieldValues, TName> &
  Pick<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "onCompositionStart" | "onKeyDown"
  > => {
  return {
    ...field,
    type: "number",
    onCompositionStart: e => {
      const target = e.currentTarget;
      target.blur();
      requestAnimationFrame(() => {
        target.focus();
      });
    },
    onKeyDown: e => {
      // e, E, +, -, . 차단
      if (["e", "E", "+", "-", "."].includes(e.key)) {
        e.preventDefault();
      }
    },
    onChange: e => {
      field.onChange(e.target.value);
    },
  };
};

/**
 * 소수점 3자리까지 입력 가능한 값인지 검증
 * @param value 입력 값
 * @returns 유효한 값이면 true, 아니면 false
 */
export const isValidDecimalInput3 = (value: string): boolean => {
  return value === "" || /^\d*\.?\d{0,3}$/.test(value);
};
