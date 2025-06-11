"use client";

import { useEffect, useState } from "react";
import {
  faTrashCan,
  faTrashCanArrowUp,
} from "@fortawesome/free-solid-svg-icons";

import { IconButton } from "@/components/iconButtons/IconButton";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants/messages";
import { Notebook } from "@/models/Notebook";
import { STATUSES } from "@/models/types/status";
import {
import {
  apiGetTrashedNotebooks,
  apiRestoreNotebook,
  apiSoftDeleteNotebook,
} from "@/services/notebooks";
import { showErrorToast, showSuccessToast } from "@/utils/toasts";

export const TrashContent = () => {
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);

  // TODO: setup redux
  useEffect(() => {
    apiGetTrashedNotebooks().then((data) => {
      setNotebooks(data);
    });
  }, []);

  const restoreNotebook = async ({ id, name }: Notebook) => {
    if (!confirm(`Restore notebook: ${name}?`)) {
      return;
    }

    try {
      await apiRestoreNotebook({ id });
      showSuccessToast(SUCCESS_MESSAGES.USER.RESTORE.NOTEBOOK);
    } catch (err) {
      console.error(err);
      showErrorToast(ERROR_MESSAGES.USER.RESTORE.NOTEBOOK);
    }
  };

  const softDeleteNotebook = async ({ id, name }: Notebook) => {
    if (!confirm(`Delete notebook: ${name}?`)) {
      return;
    }

    try {
      await apiSoftDeleteNotebook({ id });
      showSuccessToast(SUCCESS_MESSAGES.USER.DELETE.NOTEBOOK);
    } catch (err) {
      console.error(err);
      showErrorToast(ERROR_MESSAGES.USER.DELETE.NOTEBOOK);
    }
  };

  return (
    <ul className="flex flex-col gap-4">
      {notebooks.map((notebook) => (
        <li className="flex gap-x-2" key={notebook.id}>
          {notebook.name}
          <IconButton
            faIcon={faTrashCanArrowUp}
            onClick={() => restoreNotebook(notebook)}
            variant="positive"
          />
          <IconButton
            faIcon={faTrashCan}
            onClick={() => softDeleteNotebook(notebook)}
            variant="negative"
          />
        </li>
      ))}
    </ul>
  );
};
