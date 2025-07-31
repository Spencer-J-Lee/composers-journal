import { AlertAction } from "./types";

export const commonAlertActions: Record<string, AlertAction> = {
  cancel: {
    type: "sync",
    key: "cancel",
    text: "Cancel",
    variant: "ghost",
    onConfirm: () => null,
  },
};
