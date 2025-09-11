import { cn } from "@repo/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {
  icon?: ReactNode;
}

const ButtonVariants = cva(
  `w-full flex gap-[12px] items-center justify-center bold-body rounded-[8px] cursor-pointer disabled:cursor-not-allowed focus:outline-none focus:ring-0 px-[20px]`,
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
      size: {
        sm: "h-[30px]",
        md: "h-[40px]",
        lg: "h-[50px]",
        xl: "h-[60px]",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  }
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { icon, variant, size, className, children, type, ...props },
    ref
  ) {
    const resolvedType = type ?? "button";

    // unstyled variant의 경우 기본 스타일 적용 안함
    const buttonClassName =
      variant === "ghost"
        ? cn("cursor-pointer", className)
        : cn(ButtonVariants({ variant, size }), className);

    return (
      <button
        ref={ref}
        type={resolvedType}
        aria-disabled={props.disabled || undefined}
        className={buttonClassName}
        {...props}
      >
        {icon}
        {children}
      </button>
    );
  }
);
