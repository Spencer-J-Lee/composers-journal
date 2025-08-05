import { DialogAction } from "./types";

export const commonDialogActions: Record<string, DialogAction> = {
  cancel: {
    type: "sync",
    key: "cancel",
    text: "Cancel",
    variant: "ghost",
    onConfirm: () => null,
  },
};
