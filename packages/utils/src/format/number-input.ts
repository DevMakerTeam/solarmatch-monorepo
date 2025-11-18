import { InputHTMLAttributes } from "react";
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
