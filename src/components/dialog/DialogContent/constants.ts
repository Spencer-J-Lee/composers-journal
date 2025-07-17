import { Variants } from "framer-motion";

export const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.05,
    y: -25,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    y: -25,
    transition: {
      duration: 0.25,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
