import { ReactNode } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  Close,
  Content,
  Description,
  Portal,
  Title,
} from "@radix-ui/react-dialog";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

import { Card } from "@/components/Card";
import { IconButton } from "@/components/iconButtons/IconButton";
import { typographyStyles } from "@/components/Typography/constants";

import { contentVariants } from "./constants";
import { DialogOverlay } from "./DialogOverlay";

type DialogContentProps = {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
};

export const DialogContent = ({
  open,
  title,
  description,
  children,
}: DialogContentProps) => {
  return (
    <Portal forceMount>
      <DialogOverlay open={open} />

      <AnimatePresence>
        {open && (
          <Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2">
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Card paddingSize="md">
                <div className="mb-2 flex justify-between gap-x-1">
                  <Title className={clsx(typographyStyles.h3, "flex-1")}>
                    {title}
                  </Title>

                  <Close asChild>
                    <IconButton faIcon={faXmark} />
                  </Close>
                </div>

                <Description className={typographyStyles.body}>
                  {description}
                </Description>

                {children}
              </Card>
            </motion.div>
          </Content>
        )}
      </AnimatePresence>
    </Portal>
  );
};
