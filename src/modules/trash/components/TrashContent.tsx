"use client";

import { useEffect, useState } from "react";
import {
  faTrashCan,
  faTrashCanArrowUp,
} from "@fortawesome/free-solid-svg-icons";

import { IconButton } from "@/components/iconButtons/IconButton";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants/messages";
import { Entry } from "@/models/Entry";
import { Notebook } from "@/models/Notebook";
import {
  apiGetTrashedEntries,
  apiRestoreEntry,
  apiSoftDeleteEntry,
} from "@/services/entries";
import {
  apiGetTrashedNotebooks,
  apiRestoreNotebook,
  apiSoftDeleteNotebook,
} from "@/services/notebooks";
import { showErrorToast, showSuccessToast } from "@/utils/client/toasts";

export const TrashContent = () => {
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);

  // TODO: setup redux
  useEffect(() => {
    apiGetTrashedNotebooks().then((data) => {
      setNotebooks(data);
    });
    apiGetTrashedEntries().then((data) => {
      setEntries(data);
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

  const restoreEntry = async ({ id, title }: Entry) => {
    if (!confirm(`Restore entry: ${title}?`)) {
      return;
    }

    try {
      await apiRestoreEntry({ id });
      showSuccessToast(SUCCESS_MESSAGES.USER.RESTORE.ENTRY);
    } catch (err) {
      console.error(err);
      showErrorToast(ERROR_MESSAGES.USER.RESTORE.ENTRY);
    }
  };

  const softDeleteEntry = async ({ id, title }: Entry) => {
    if (!confirm(`Delete entry: ${title}?`)) {
      return;
    }

    try {
      await apiSoftDeleteEntry({ id });
      showSuccessToast(SUCCESS_MESSAGES.USER.DELETE.ENTRY);
    } catch (err) {
      console.error(err);
      showErrorToast(ERROR_MESSAGES.USER.DELETE.ENTRY);
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
            textVariant="positive"
          />
          <IconButton
            faIcon={faTrashCan}
            onClick={() => softDeleteNotebook(notebook)}
            textVariant="negative"
          />
        </li>
      ))}

      {entries.map((entry) => (
        <li className="flex gap-x-2" key={entry.id}>
          {entry.title}
          <IconButton
            faIcon={faTrashCanArrowUp}
            onClick={() => restoreEntry(entry)}
            textVariant="positive"
          />
          <IconButton
            faIcon={faTrashCan}
            onClick={() => softDeleteEntry(entry)}
            textVariant="negative"
          />
        </li>
      ))}
    </ul>
  );
};
