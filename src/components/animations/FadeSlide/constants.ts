import { Variants } from "framer-motion";

export const fadeSlideVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.1,
    y: -25,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 1.1,
    y: -25,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};
