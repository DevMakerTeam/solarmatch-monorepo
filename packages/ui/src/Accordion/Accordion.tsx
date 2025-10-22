import { useState } from "react";
import AccordionContent from "./components/AccordionContent";
import AccordionTrigger from "./components/AccordionTrigger";
import { AccordionContext } from "./hooks/AccordionContext";
import { AccordionProps } from "./types";

const Accordion = (props: AccordionProps) => {
  const {
    children,
    defaultOpen = false,
    isOpen: controlledIsOpen,
    onToggle,
    className = "",
  } = props;

  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);

  // controlled mode 또는 uncontrolled mode
  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const toggle = onToggle || (() => setInternalIsOpen(!internalIsOpen));

  return (
    <AccordionContext.Provider value={{ isOpen, toggle }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
};

Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

export default Accordion;
