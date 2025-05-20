import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

type FieldErrorProps = {
  show: boolean;
  children: ReactNode;
};

export const FieldError = ({ show, children }: FieldErrorProps) => {
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.15 }}
          className="text-danger mt-2 overflow-hidden text-sm"
        >
          {children}
        </motion.p>
      )}
    </AnimatePresence>
  );
};
