import { AlertAction } from "./types";

export const commonAlertActions: Record<string, AlertAction> = {
  cancel: {
    text: "Cancel",
    variant: "ghost",
    onClick: () => null,
  },
};
