import { ReactNode } from "react";
import { Root, Trigger } from "@radix-ui/react-dialog";

import { DialogContent } from "./DialogContent";
import { DialogSize } from "./DialogContent/types";

export type DialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  size: DialogSize;
  hideClose?: boolean;
  trigger?: ReactNode;
  children: ReactNode;
};

export const Dialog = ({
  open,
  setOpen,
  title,
  description,
  size,
  hideClose,
  trigger,
  children,
}: DialogProps) => {
  return (
    <Root open={open} onOpenChange={setOpen}>
      {trigger && (
        <Trigger asChild onClick={() => setOpen(true)}>
          {trigger}
        </Trigger>
      )}

      <DialogContent
        open={open}
        title={title}
        description={description}
        size={size}
        hideClose={hideClose}
      >
        {children}
      </DialogContent>
    </Root>
  );
};
