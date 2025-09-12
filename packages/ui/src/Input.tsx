import { cn } from "@repo/utils";
import { VariantProps, cva } from "class-variance-authority";
import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";

const InputVariants = cva(
  "w-full px-[22px] rounded-[8px] border-1 medium-body placeholder:text-middle-gray text-black transition-colors duration-200 focus:outline-none disabled:border-none disabled:bg-light-gray disabled:text-deep-gray disabled:cursor-not-allowed read-only:bg-light-gray read-only:cursor-default read-only:text-deep-gray &[[read-only]:focus]:border-primary border-border-color hover:border-gray-400 focus:border-primary data-[error=true]:border-cancel &[data-[error=true]:hover]:border-cancel &[data-[error=true]:focus]:border-primary",
  {
    variants: {
      size: {
        sm: "h-[40px] py-[10px]",
        md: "h-[50px] py-[12px]",
        lg: "h-[60px] py-[18px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof InputVariants> {
  isError?: boolean;
}

function Input(
  {
    size,
    className,
    placeholder,
    required,
    disabled,
    readOnly,
    isError = false,
    type = "text",
    ["aria-invalid"]: ariaInvalidProp,
    ["aria-required"]: ariaRequiredProp,
    ["aria-disabled"]: ariaDisabledProp,
    ["aria-readonly"]: ariaReadonlyProp,
    ...props
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const inputPlaceholder = placeholder || "입력해 주세요";

  // a11y settigns
  const ariaInvalid: React.AriaAttributes["aria-invalid"] =
    ariaInvalidProp ?? (isError ? true : undefined);

  const ariaRequired: React.AriaAttributes["aria-required"] =
    ariaRequiredProp ?? (required ? true : undefined);

  const ariaDisabled: React.AriaAttributes["aria-disabled"] =
    ariaDisabledProp ?? (disabled ? true : undefined);

  const ariaReadonly: React.AriaAttributes["aria-readonly"] =
    ariaReadonlyProp ?? (readOnly ? true : undefined);

  return (
    <input
      ref={ref}
      className={cn(InputVariants({ size }), className)}
      type={type}
      data-error={isError}
      placeholder={inputPlaceholder}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
      aria-invalid={ariaInvalid}
      aria-required={ariaRequired}
      aria-disabled={ariaDisabled}
      aria-readonly={ariaReadonly}
      {...props}
    />
  );
}

export default forwardRef<HTMLInputElement, InputProps>(Input);
