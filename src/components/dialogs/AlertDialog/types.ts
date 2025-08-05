import { ButtonVariant } from "@/components/buttons/types";

type DialogActionBase = {
  key: string;
  text: string;
  variant: ButtonVariant;
};

type SyncDialogAction = DialogActionBase & {
  type: "sync";
  onConfirm: () => void;
};

export type AsyncDialogAction = DialogActionBase & {
  type: "async";
  onConfirm: () => Promise<unknown>;
  successMsg: string;
  errMsg: string;
};

export type DialogAction = SyncDialogAction | AsyncDialogAction;
