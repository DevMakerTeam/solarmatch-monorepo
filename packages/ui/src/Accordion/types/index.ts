import { HTMLAttributes, ReactNode } from "react";

export interface AccordionProps {
  children: ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

export interface AccordionTriggerProps
  extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}
