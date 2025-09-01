import { ReactNode } from "react";
import { motion } from "framer-motion";

import { fadeSlideVariants } from "./constants";

type FadeSlideProps = {
  children: ReactNode;
};

export const FadeSlide = ({ children }: FadeSlideProps) => {
  return (
    <motion.div
      variants={fadeSlideVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};
