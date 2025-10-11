import { VariantProps } from "class-variance-authority";
import { InputHTMLAttributes } from "react";
import { InputVariants } from "../Input";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof InputVariants> {
  isError?: boolean;
}
