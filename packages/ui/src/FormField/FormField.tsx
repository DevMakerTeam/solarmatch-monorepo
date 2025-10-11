import { cn } from "@repo/utils";
import { FormFieldProps } from "./types";

function FormField({
  label,
  required = false,
  className,
  children,
}: FormFieldProps) {
  return (
    <div
      className={cn("flex flex-col gap-2 w-full", className)}
      role="group"
      aria-labelledby={`${label}-label`}
    >
      <div
        id={`${label}-label`}
        className="text-black flex items-center gap-[4px] w-fit leading-normal bold-body"
      >
        <span>{label}</span>
        {required && (
          <>
            <span className="text-cancel mt-[4px]">*</span>
            <span className="sr-only">(필수)</span>
          </>
        )}
      </div>
      {children}
    </div>
  );
}

export default FormField;
