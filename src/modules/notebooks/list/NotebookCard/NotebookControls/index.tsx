"use client";

import { JSX, useState } from "react";
import {
  faEdit,
  faTrashCan,
  faTrashCanArrowUp,
} from "@fortawesome/free-solid-svg-icons";

import { IconButton } from "@/components/iconButtons/IconButton";
import { LinkIconButton } from "@/components/iconButtons/LinkIconButton";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants/messages";
import { routes } from "@/constants/routes";
import {
  useRestoreNotebook,
  useSoftDeleteNotebook,
  useTrashNotebook,
} from "@/hooks/cache/notebooks";
import { Notebook } from "@/models/Notebook";
import { showErrorToast, showSuccessToast } from "@/utils/client/toasts";

import { NotebookControl } from "./types";

type NotebookControlsProps = {
  notebook: Notebook;
  controls: NotebookControl[];
};

export const NotebookControls = ({
  notebook,
  controls,
}: NotebookControlsProps) => {
  const { mutateAsync: restoreNotebook, isPending: isRestorePending } =
    useRestoreNotebook();
  const { mutateAsync: softDeleteNotebook, isPending: isSoftDeletePending } =
    useSoftDeleteNotebook();
  const { mutateAsync: trashNotebook, isPending: isTrashPending } =
    useTrashNotebook();
  const actionPending =
    isRestorePending || isSoftDeletePending || isTrashPending;

  const handleRestoreNotebook = async ({ id, name }: Notebook) => {
    if (!confirm(`Restore notebook: ${name}?`)) {
      return;
    }

    try {
      await restoreNotebook(id);
      showSuccessToast(SUCCESS_MESSAGES.USER.RESTORE.NOTEBOOK);
    } catch (err) {
      console.error(err);
      showErrorToast(ERROR_MESSAGES.USER.RESTORE.NOTEBOOK);
    }
  };

  const handleTrashNotebook = async ({ id, name }: Notebook) => {
    if (!confirm(`Trash notebook: ${name}?`)) {
      return;
    }

    try {
      await trashNotebook(id);
      showSuccessToast(SUCCESS_MESSAGES.USER.TRASH.NOTEBOOK);
    } catch (err) {
      console.error(err);
      showErrorToast(ERROR_MESSAGES.USER.TRASH.NOTEBOOK);
    }
  };

  const handleSoftDeleteNotebook = async ({ id, name }: Notebook) => {
    if (!confirm(`Delete notebook: ${name}?`)) {
      return;
    }

    try {
      await softDeleteNotebook(id);
      showSuccessToast(SUCCESS_MESSAGES.USER.DELETE.NOTEBOOK);
    } catch (err) {
      console.error(err);
      showErrorToast(ERROR_MESSAGES.USER.DELETE.NOTEBOOK);
    }
  };

  const controlMap: Record<NotebookControl, JSX.Element> = {
    edit: (
      <LinkIconButton
        href={routes.notebookEdit(notebook.id)}
        faIcon={faEdit}
        key="edit"
      />
    ),
    restore: (
      <IconButton
        onClick={() => handleRestoreNotebook(notebook)}
        loading={isRestorePending}
        disabled={actionPending}
        faIcon={faTrashCanArrowUp}
        textVariant="positive"
        key="restore"
      />
    ),
    trash: (
      <IconButton
        onClick={() => handleTrashNotebook(notebook)}
        loading={isTrashPending}
        disabled={actionPending}
        faIcon={faTrashCan}
        textVariant="negative"
        key="trash"
      />
    ),
    delete: (
      <IconButton
        onClick={() => handleSoftDeleteNotebook(notebook)}
        loading={isSoftDeletePending}
        disabled={actionPending}
        faIcon={faTrashCan}
        textVariant="negative"
        key="delete"
      />
    ),
  };

  return (
    <div className="flex flex-col items-center gap-1 p-2">
      {controls.map((control) => controlMap[control])}
    </div>
  );
};
