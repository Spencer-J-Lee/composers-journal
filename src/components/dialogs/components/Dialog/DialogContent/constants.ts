import { Variants } from "framer-motion";

export const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -25,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.15,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -25,
    transition: {
      duration: 0.15,
      ease: "easeInOut",
    },
  },
};
