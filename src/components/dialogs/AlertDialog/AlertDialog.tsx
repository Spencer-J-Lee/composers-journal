"use client";

import { useAlert } from "@/hooks/useAlert";

import { Dialog } from "../components/Dialog";

/**
 * Global alert dialog intended to be used via the `useAlert` hook.
 */
export const AlertDialog = () => {
  const { open, title, description, actions, setOpen } = useAlert();

  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      title={title}
      description={description}
      actions={actions}
      size="sm"
      hideClose
      persistent
    />
  );
};
