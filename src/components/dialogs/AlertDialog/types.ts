import { ButtonVariant } from "@/components/buttons/types";

type AlertActionBase = {
  key: string;
  text: string;
  variant: ButtonVariant;
};

type SyncAlertAction = AlertActionBase & {
  type: "sync";
  onConfirm: () => void;
};

export type AsyncAlertAction = AlertActionBase & {
  type: "async";
  onConfirm: () => Promise<unknown>;
  successMsg: string;
  errMsg: string;
};

export type AlertAction = SyncAlertAction | AsyncAlertAction;
