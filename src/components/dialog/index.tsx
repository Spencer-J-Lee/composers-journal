import { ReactNode, useState } from "react";
import { Root, Trigger } from "@radix-ui/react-dialog";

import { DialogContent } from "./DialogContent";

type DialogProps = {
  trigger: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
};

export const Dialog = ({
  trigger,
  title,
  description,
  children,
}: DialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Root open={open} onOpenChange={setOpen}>
      <Trigger asChild onClick={() => setOpen(true)}>
        {trigger}
      </Trigger>

      <DialogContent open={open} title={title} description={description}>
        {children}

        {/* TODO: implement dialog actions */}
        {/* <div className="mt-[25px] flex justify-end">
          <Dialog.Close asChild>
            <button>
              Save changes
            </button>
          </Dialog.Close>
        </div> */}
      </DialogContent>
    </Root>
  );
};
