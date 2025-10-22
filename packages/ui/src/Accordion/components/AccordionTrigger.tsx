import { Button } from "../../Button";
import { useAccordionContext } from "../hooks/AccordionContext";
import { AccordionTriggerProps } from "../types";

const AccordionTrigger = ({
  children,
  className = "",
  ...props
}: AccordionTriggerProps) => {
  const { isOpen, toggle } = useAccordionContext();

  return (
    <Button
      onClick={toggle}
      aria-expanded={isOpen}
      className={className}
      variant="ghost"
      {...props}
    >
      {children}
    </Button>
  );
};

export default AccordionTrigger;
