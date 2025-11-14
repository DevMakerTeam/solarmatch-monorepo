import { cn } from "@repo/utils";
import { cva } from "class-variance-authority";
import { AriaAttributes, ForwardedRef, forwardRef } from "react";
import { InputProps } from "./types";

export const InputVariants = cva(
  "w-full px-[22px] rounded-[8px] border-1 medium-body placeholder:text-middle-gray text-black transition-colors duration-200 focus:outline-none disabled:border-none disabled:bg-light-gray disabled:text-deep-gray disabled:cursor-not-allowed read-only:bg-light-gray read-only:cursor-default read-only:text-deep-gray read-only:focus:border-border-color read-only:hover:border-border-color border-border-color hover:border-gray-400 focus:border-primary data-[error=true]:border-cancel &[data-[error=true]:hover]:border-cancel &[data-[error=true]:focus]:border-primary",
  {
    variants: {},
  }
);

function Input(
  {
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
    autoComplete = "off",
    ...props
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const inputPlaceholder = placeholder || "입력해 주세요";

  // a11y settigns
  const ariaInvalid: AriaAttributes["aria-invalid"] =
    ariaInvalidProp ?? (isError ? true : undefined);

  const ariaRequired: AriaAttributes["aria-required"] =
    ariaRequiredProp ?? (required ? true : undefined);

  const ariaDisabled: AriaAttributes["aria-disabled"] =
    ariaDisabledProp ?? (disabled ? true : undefined);

  const ariaReadonly: AriaAttributes["aria-readonly"] =
    ariaReadonlyProp ?? (readOnly ? true : undefined);

  return (
    <input
      ref={ref}
      className={cn(InputVariants(), className)}
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
      autoComplete={autoComplete}
      {...props}
    />
  );
}

/**
 * 접근성을 지원하는 Input 컴포넌트
 *
 * @example
 * // ✅ 좋은 예: label과 함께 사용
 * <label htmlFor="username">
 *   사용자 이름
 *   <Input id="username" name="username" placeholder="이름을 입력하세요" />
 * </label>
 *
 * @example
 * // ✅ 좋은 예: 필수 입력 표시 (aria-required)
 * <label htmlFor="email">
 *   이메일 (필수)
 *   <Input id="email" type="email" required aria-required={true} />
 * </label>
 *
 * @example
 * // ✅ 좋은 예: 에러 상태와 메시지 연결 (aria-invalid, aria-describedby)
 * <>
 *   <label htmlFor="password">비밀번호</label>
 *   <Input
 *     id="password"
 *     type="password"
 *     isError={hasError}
 *     aria-invalid={hasError}
 *     aria-describedby={hasError ? "password-error" : undefined}
 *   />
 *   {hasError && <p id="password-error" role="alert">비밀번호는 8자 이상이어야 합니다</p>}
 * </>
 *
 * @example
 * // ✅ 좋은 예: 도움말 텍스트 연결 (aria-describedby)
 * <>
 *   <label htmlFor="phone">전화번호</label>
 *   <Input
 *     id="phone"
 *     type="tel"
 *     aria-describedby="phone-help"
 *   />
 *   <span id="phone-help">010-1234-5678 형식으로 입력해주세요</span>
 * </>
 *
 * @example
 * // ✅ 좋은 예: 읽기 전용 상태 (aria-readonly)
 * <Input
 *   value={userEmail}
 *   readOnly
 *   aria-readonly={true}
 * />
 */
export default forwardRef<HTMLInputElement, InputProps>(Input);
