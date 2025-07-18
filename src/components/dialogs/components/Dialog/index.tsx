import { ReactNode, useState } from "react";
import { Root, Trigger } from "@radix-ui/react-dialog";

import { DialogContent } from "./DialogContent";
import { DialogSize } from "./DialogContent/types";

export type DialogProps = {
  trigger: ReactNode;
  title: string;
  description?: string;
  size: DialogSize;
  children: ReactNode;
  hideClose?: boolean;
};

export const Dialog = ({
  trigger,
  title,
  description,
  children,
  size,
  hideClose,
}: DialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Root open={open} onOpenChange={setOpen}>
      <Trigger asChild onClick={() => setOpen(true)}>
        {trigger}
      </Trigger>

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
