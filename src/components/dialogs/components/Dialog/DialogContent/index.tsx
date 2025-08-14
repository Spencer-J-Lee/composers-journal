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
import { DialogAction } from "@/components/dialogs/AlertDialog/types";
import { Divider } from "@/components/Divider";
import { IconButton } from "@/components/iconButtons/IconButton";
import { typographyStyles } from "@/components/Typography/constants";

import { contentVariants } from "./constants";
import { DialogActions } from "./DialogActions";
import { DialogOverlay } from "./DialogOverlay";
import { sizeClassName } from "./styles";
import { DialogSize } from "./types";

export type DialogContentProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  size: DialogSize;
  actions?: DialogAction[];
  children?: ReactNode;
  hideClose?: boolean;

  /** When true, the dialog must be closed via explicit action
   * (e.g., close button or action button).
   * */
  persistent?: boolean;
};

export const DialogContent = ({
  open,
  setOpen,
  title,
  description,
  children,
  size,
  actions,
  hideClose,
  persistent,
}: DialogContentProps) => {
  const baseContentClassName =
    "fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] -translate-x-1/2 -translate-y-1/2";

  const overlayBehavior = persistent
    ? {
        onPointerDownOutside: (e: Event) => e.preventDefault(),
        onInteractOutside: (e: Event) => e.preventDefault(),
      }
    : {};

  return (
    <Portal forceMount>
      <DialogOverlay open={open} />

      <AnimatePresence>
        {open && (
          // TODO: add option to keep dialog open even when clicking outside
          <Content
            className={clsx(
              baseContentClassName,
              sizeClassName[size],
              "z-dialog-content",
            )}
            aria-describedby={undefined}
            {...overlayBehavior}
          >
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Card paddingSize="lg">
                <div className="mb-2 flex justify-between gap-x-1">
                  {title && (
                    <Title className={clsx(typographyStyles.h3, "flex-1")}>
                      {title}
                    </Title>
                  )}

                  {!hideClose && (
                    <Close asChild>
                      <IconButton faIcon={faXmark} />
                    </Close>
                  )}
                </div>

                {description && (
                  <Description className={typographyStyles.smallMuted}>
                    {description}
                  </Description>
                )}

                {description && children && <Divider className="my-5" />}

                {children}

                {actions && (
                  <DialogActions setOpen={setOpen} actions={actions} />
                )}
              </Card>
            </motion.div>
          </Content>
        )}
      </AnimatePresence>
    </Portal>
  );
};
