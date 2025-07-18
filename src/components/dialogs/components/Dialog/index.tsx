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
};

export const Dialog = ({
  trigger,
  title,
  description,
  children,
  size,
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
      >
        {children}
      </DialogContent>
    </Root>
  );
};
