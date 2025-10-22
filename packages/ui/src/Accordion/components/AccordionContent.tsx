import { AnimatePresence, motion } from "framer-motion";
import { useAccordionContext } from "../hooks/AccordionContext";
import { AccordionContentProps } from "../types";

const AccordionContent = ({
  children,
  className = "",
}: AccordionContentProps) => {
  const { isOpen } = useAccordionContext();

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ overflow: "hidden" }}
        >
          <div className={className}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AccordionContent;
