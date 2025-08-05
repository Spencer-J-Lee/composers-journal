import { ReactNode } from "react";
import { Root, Trigger } from "@radix-ui/react-dialog";

import { DialogContent } from "./DialogContent";
import { DialogSize } from "./DialogContent/types";
import { DialogAction } from "../../AlertDialog/types";

export type DialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  size: DialogSize;
  actions?: DialogAction[];
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
  actions,
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
        setOpen={setOpen}
        title={title}
        description={description}
        size={size}
        actions={actions}
        hideClose={hideClose}
      >
        {children}
      </DialogContent>
    </Root>
  );
};
