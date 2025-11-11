import { cn } from "@repo/utils";
import { FormHelperProps } from "./types";

const FormHelper = ({ message, className, children }: FormHelperProps) => {
  const isShowErrorText = !!message?.error;

  return (
    <div className={cn("flex flex-col gap-[8px] w-full", className)}>
      {children}

      {isShowErrorText && (
        <span className="text-cancel regular-caption">{message?.error}</span>
      )}
    </div>
  );
};

export default FormHelper;
