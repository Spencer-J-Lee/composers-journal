import { DialogClose } from "@radix-ui/react-dialog";

import { AlertAction } from "./types";
import { Button } from "../../buttons/Button";
import { Dialog, DialogProps } from "../components/Dialog";

type AlertDialogProps = {
  actions: AlertAction[];
} & DialogProps;

export const AlertDialog = ({
  actions,
  trigger,
  title,
  description,
  children,
  size,
}: AlertDialogProps) => {
  return (
    <Dialog
      trigger={trigger}
      title={title}
      description={description}
      size={size}
      hideClose
    >
      {children}

      <div className="mt-6 flex justify-end gap-x-2">
        {/* TODO: handle async actions */}
        {actions.map(({ text, variant, onClick }) => (
          <DialogClose asChild key={text}>
            <Button onClick={onClick} variant={variant}>
              {text}
            </Button>
          </DialogClose>
        ))}
      </div>
    </Dialog>
  );
};
