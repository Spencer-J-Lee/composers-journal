"use client";

import { useState } from "react";

import { Button } from "@/components/buttons/Button";
import { isAsyncDialogAction } from "@/components/dialogs/AlertDialog/helpers";
import { DialogAction } from "@/components/dialogs/AlertDialog/types";
import { showErrorToast, showSuccessToast } from "@/utils/client/toasts";

import { DialogActionsWrapper } from "./DialogActionsWrapper";

type DialogActionsProps = {
  setOpen: (open: boolean) => void;
  actions: DialogAction[];
};

export const DialogActions = ({ setOpen, actions }: DialogActionsProps) => {
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const handleActionClick = async (action: DialogAction) => {
    const { key, onConfirm } = action;

    if (isAsyncDialogAction(action)) {
      setLoading((prev) => ({ ...prev, [key]: true }));

      try {
        await onConfirm();
        showSuccessToast(action.successMsg);
        setOpen(false);
      } catch (err) {
        console.log(err);
        showErrorToast(action.errMsg);
      }

      setLoading((prev) => ({ ...prev, [key]: false }));
      return;
    }

    action.onConfirm();
    setOpen(false);
  };

  return (
    <DialogActionsWrapper>
      {actions.map((action) => (
        <Button
          key={action.key}
          onClick={() => handleActionClick(action)}
          variant={action.variant}
          loading={loading[action.key]}
        >
          {action.text}
        </Button>
      ))}
    </DialogActionsWrapper>
  );
};
