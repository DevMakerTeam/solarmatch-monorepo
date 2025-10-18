import { cn } from "@repo/utils";
import { cva } from "class-variance-authority";
import { AriaAttributes, ForwardedRef, forwardRef } from "react";
import { TextareaProps } from "./types";

export const TextareaVariants = cva(
  "w-full px-[22px] py-[18px] rounded-[12px] border border-border-color resize-none outline-none transition-all duration-200 placeholder:text-middle-gray hover:border-gray-400 focus:border-primary disabled:hover:border-border-color read-only:hover:border-border-color"
);

function Textarea(
  {
    className,
    placeholder,
    required,
    disabled,
    readOnly,
    ["aria-required"]: ariaRequiredProp,
    ["aria-disabled"]: ariaDisabledProp,
    ["aria-readonly"]: ariaReadonlyProp,
    ...props
  }: TextareaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  const textareaPlaceholder = placeholder || "입력해 주세요";

  // a11y settings
  const ariaRequired: AriaAttributes["aria-required"] =
    ariaRequiredProp ?? (required ? true : undefined);

  const ariaDisabled: AriaAttributes["aria-disabled"] =
    ariaDisabledProp ?? (disabled ? true : undefined);

  const ariaReadonly: AriaAttributes["aria-readonly"] =
    ariaReadonlyProp ?? (readOnly ? true : undefined);

  return (
    <textarea
      ref={ref}
      className={cn(TextareaVariants(), className)}
      placeholder={textareaPlaceholder}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
      aria-required={ariaRequired}
      aria-disabled={ariaDisabled}
      aria-readonly={ariaReadonly}
      {...props}
    />
  );
}

export default forwardRef<HTMLTextAreaElement, TextareaProps>(Textarea);
