import { createContext, useContext } from "react";

interface AccordionContextValue {
  isOpen: boolean;
  toggle: () => void;
}

export const AccordionContext = createContext<AccordionContextValue | null>(
  null
);

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      "Accordion compound components must be used within Accordion"
    );
  }
  return context;
};
