import { cn } from "@repo/utils";
import { cva } from "class-variance-authority";
import { AriaAttributes, ForwardedRef, forwardRef } from "react";
import { ButtonProps } from "./types";

export const ButtonVariants = cva(
  `w-full flex gap-[12px] items-center justify-center bold-body rounded-[8px] cursor-pointer disabled:cursor-not-allowed focus:outline-none focus:ring-0 px-[20px] whitespace-nowrap`,
  {
    variants: {
      variant: {
        solid:
          "bg-primary text-white hover:bg-primary-hover active:bg-primary-active disabled:bg-light-gray disabled:text-deep-gray",
        outline:
          "border border-primary bg-white text-primary hover:bg-primary-hover active:bg-primary-active hover:text-white active:text-white disabled:border-none disabled:bg-light-gray disabled:text-deep-gray",
        kakao:
          "bg-kakao text-black hover:bg-kakao-hover active:bg-kakao-active disabled:bg-kakao-disabled",
        cancel:
          "bg-cancel text-white hover:bg-cancel-hover active:bg-cancel-active disabled:bg-cancel-disabled",
        ghost: "",
      },
    },
    defaultVariants: {
      variant: "solid",
    },
  }
);

function ButtonComponent(
  {
    icon,
    variant,
    className,
    children,
    type,
    disabled,
    ["aria-disabled"]: ariaDisabledProp,
    ["aria-pressed"]: ariaPressed,
    ["aria-label"]: ariaLabel,
    ["aria-describedby"]: ariaDescribedby,
    ["aria-busy"]: ariaBusy,
    ...props
  }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const resolvedType = type ?? "button";

  // a11y settings
  const ariaDisabled: AriaAttributes["aria-disabled"] =
    ariaDisabledProp ?? (disabled ? true : undefined);

  // ghost variant의 경우 기본 스타일 적용 안함
  const buttonClassName = cn(
    variant === "ghost"
      ? "cursor-pointer focus:outline-none focus:ring-0"
      : ButtonVariants({ variant }),
    className
  );

  return (
    <button
      ref={ref}
      type={resolvedType}
      disabled={disabled}
      aria-disabled={ariaDisabled}
      aria-pressed={ariaPressed}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      aria-busy={ariaBusy}
      className={buttonClassName}
      {...props}
    >
      {children}
      {icon}
    </button>
  );
}

/**
 * 접근성을 지원하는 Button 컴포넌트
 *
 * @example
 * // ✅ 명확한 텍스트와 함께 사용
 * <Button onClick={handleSubmit}>
 *   제출하기
 * </Button>
 *
 * @example
 * // ✅ 아이콘 전용 버튼은 aria-label 필수
 * <Button icon={<Icon iconName="trash" />} aria-label="삭제하기" />
 *
 * @example
 * // ✅ 토글 버튼 (aria-pressed)
 * <Button aria-pressed={isActive} onClick={handleToggle}>
 *   좋아요
 * </Button>
 *
 * @example
 * // ✅ 로딩 상태 (aria-busy)
 * <Button aria-busy={isLoading} disabled={isLoading}>
 *   {isLoading ? "처리 중..." : "제출하기"}
 * </Button>
 *
 * @example
 * // ✅ 에러 메시지와 연결 (aria-describedby)
 * <>
 *   <Button
 *     type="submit"
 *     disabled={!isValid}
 *     aria-describedby={hasError ? "submit-error" : undefined}
 *   >
 *     제출하기
 *   </Button>
 *   {hasError && <p id="submit-error" role="alert">필수 항목을 확인해주세요</p>}
 * </>
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(ButtonComponent);

export default Button;
