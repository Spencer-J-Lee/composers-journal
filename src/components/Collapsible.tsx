import { ReactNode, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

type CollapsibleProps = {
  children: ReactNode;
  show: boolean;
  defaultShow?: boolean;
  tag?: "div" | "p";
};

export const Collapsible = ({
  children,
  show,
  tag = "div",
  defaultShow = false,
}: CollapsibleProps) => {
  const MotionComponent = useMemo(() => {
    switch (tag) {
      case "div":
        return motion.div;
      case "p":
        return motion.p;
    }
  }, [tag]);

  return (
    <AnimatePresence initial={defaultShow}>
      {show && (
        <MotionComponent
          variants={{
            collapsed: { opacity: 0, height: 0 },
            expanded: { opacity: 1, height: "auto" },
          }}
          initial="collapsed"
          animate="expanded"
          exit="collapsed"
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          {children}
        </MotionComponent>
      )}
    </AnimatePresence>
  );
};
