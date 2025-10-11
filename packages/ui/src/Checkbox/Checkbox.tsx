import { cn } from "@repo/utils";
import { AriaAttributes, ForwardedRef, forwardRef } from "react";
import { Icon } from "../Icon";
import { CheckboxProps } from "./types";

function CheckboxComponent(
  {
    className,
    required,
    disabled,
    type = "checkbox",
    ["aria-required"]: ariaRequiredProp,
    ["aria-disabled"]: ariaDisabledProp,
    ["aria-invalid"]: ariaInvalid,
    ...props
  }: CheckboxProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  // a11y settings
  const ariaRequired: AriaAttributes["aria-required"] =
    ariaRequiredProp ?? (required ? true : undefined);

  const ariaDisabled: AriaAttributes["aria-disabled"] =
    ariaDisabledProp ?? (disabled ? true : undefined);

  return (
    <div className="relative inline-flex items-center justify-center w-5 h-5">
      <input
        ref={ref}
        type={type}
        className="peer absolute inset-0 opacity-0 cursor-pointer z-10"
        required={required}
        disabled={disabled}
        aria-required={ariaRequired}
        aria-disabled={ariaDisabled}
        aria-invalid={ariaInvalid}
        {...props}
      />
      <div
        className={cn(
          "absolute inset-0 rounded border-2 flex items-center justify-center transition-all pointer-events-none",
          "border-border-color bg-white",
          "peer-hover:border-primary",
          "peer-checked:bg-primary peer-checked:border-primary",
          "peer-disabled:opacity-50 peer-disabled:hover:border-border-color",
          className
        )}
      />
      <Icon
        iconName="boldCheck"
        className="relative z-0 w-[12px] h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
      />
    </div>
  );
}

/**
 * 접근성을 지원하는 Checkbox 컴포넌트
 *
 * @example
 * // ✅ 좋은 예: label과 함께 사용
 * <label htmlFor="agree">
 *   <Checkbox id="agree" name="agree" />
 *   동의합니다
 * </label>
 *
 * @example
 * // ✅ 좋은 예: aria-describedby로 설명 연결
 * <>
 *   <Checkbox
 *     id="agree"
 *     aria-describedby="agree-description"
 *     aria-invalid={hasError}
 *   />
 *   <span id="agree-description">개인정보 처리방침에 동의</span>
 *   {hasError && <span role="alert">필수 항목입니다</span>}
 * </>
 */
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(CheckboxComponent);

export default Checkbox;
