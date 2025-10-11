import { PropsWithChildren } from "react";

interface FormField {
  label: string;
  required?: boolean;
  className?: string;
}

export type FormFieldProps = PropsWithChildren<FormField>;
