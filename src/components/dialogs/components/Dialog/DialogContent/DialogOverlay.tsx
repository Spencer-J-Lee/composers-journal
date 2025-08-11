import { Overlay } from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";

type DialogOverlayProps = {
  open: boolean;
};

export const DialogOverlay = ({ open }: DialogOverlayProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* TODO: fix issue where top bar in trash page overlaps this overlay */}
          <Overlay className="z-dialog-overlay fixed inset-0 bg-black/60" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
