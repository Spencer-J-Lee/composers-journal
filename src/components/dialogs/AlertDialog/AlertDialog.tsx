"use client";

import { useState } from "react";

import { useAlert } from "@/hooks/useAlert";
import { showErrorToast, showSuccessToast } from "@/utils/client/toasts";

import { isAsyncAlertAction } from "./helpers";
import { AlertAction } from "./types";
import { Button } from "../../buttons/Button";
import { Dialog } from "../components/Dialog";

export const AlertDialog = () => {
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const { open, title, description, actions, setOpen } = useAlert();

  const handleActionClick = async (action: AlertAction) => {
    const { key, onConfirm } = action;

    if (isAsyncAlertAction(action)) {
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
    <Dialog
      open={open}
      setOpen={setOpen}
      title={title}
      description={description}
      size="sm"
      hideClose
    >
      <div className="mt-6 flex justify-end gap-x-2">
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
      </div>
    </Dialog>
  );
};
