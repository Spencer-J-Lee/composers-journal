"use client";

import {
  faTrashCan,
  faTrashCanArrowUp,
} from "@fortawesome/free-solid-svg-icons";

import { IconButton } from "@/components/iconButtons/IconButton";
import { Typography } from "@/components/Typography";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants/messages";
import {
  useRestoreEntry,
  useSoftDeleteEntry,
  useTrashedEntries,
} from "@/hooks/cache/entries";
import {
  useRestoreNotebook,
  useSoftDeleteNotebook,
  useTrashedNotebooks,
} from "@/hooks/cache/notebooks";
import { Entry } from "@/models/Entry";
import { Notebook } from "@/models/Notebook";
import { showErrorToast, showSuccessToast } from "@/utils/client/toasts";

export const TrashContent = () => {
  const { data: notebooks } = useTrashedNotebooks();
  const { data: entries } = useTrashedEntries();
  const { mutateAsync: restoreNotebook } = useRestoreNotebook();
  const { mutateAsync: softDeleteNotebook } = useSoftDeleteNotebook();
  const { mutateAsync: restoreEntry } = useRestoreEntry();
  const { mutateAsync: softDeleteEntry } = useSoftDeleteEntry();

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

  const handleRestoreEntry = async ({ id, title }: Entry) => {
    if (!confirm(`Restore entry: ${title}?`)) {
      return;
    }

    try {
      await restoreEntry(id);
      showSuccessToast(SUCCESS_MESSAGES.USER.RESTORE.ENTRY);
    } catch (err) {
      console.error(err);
      showErrorToast(ERROR_MESSAGES.USER.RESTORE.ENTRY);
    }
  };

  const handleSoftDeleteEntry = async ({ id, title }: Entry) => {
    if (!confirm(`Delete entry: ${title}?`)) {
      return;
    }

    try {
      await softDeleteEntry(id);
      showSuccessToast(SUCCESS_MESSAGES.USER.DELETE.ENTRY);
    } catch (err) {
      console.error(err);
      showErrorToast(ERROR_MESSAGES.USER.DELETE.ENTRY);
    }
  };

  return (
    <>
      {!!notebooks?.length && (
        <section>
          <Typography variant="h2">Notebooks</Typography>
          <ul className="flex flex-col gap-4">
            {notebooks.map((notebook) => (
              <li className="flex gap-x-2" key={notebook.id}>
                {notebook.name}
                <IconButton
                  faIcon={faTrashCanArrowUp}
                  onClick={() => handleRestoreNotebook(notebook)}
                  textVariant="positive"
                />
                <IconButton
                  faIcon={faTrashCan}
                  onClick={() => handleSoftDeleteNotebook(notebook)}
                  textVariant="negative"
                />
                <small className="text-text-muted">
                  Created: {new Date(notebook.createdAt).toLocaleDateString()}
                </small>
              </li>
            ))}
          </ul>
        </section>
      )}

      {!!entries?.length && (
        <section>
          <Typography variant="h2">Entries</Typography>
          <ul className="flex flex-col gap-4">
            {entries.map((entry) => (
              <li className="flex gap-x-2" key={entry.id}>
                {entry.title}
                <IconButton
                  faIcon={faTrashCanArrowUp}
                  onClick={() => handleRestoreEntry(entry)}
                  textVariant="positive"
                />
                <IconButton
                  faIcon={faTrashCan}
                  onClick={() => handleSoftDeleteEntry(entry)}
                  textVariant="negative"
                />
                <small className="text-text-muted">
                  Created: {new Date(entry.createdAt).toLocaleDateString()}
                </small>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
};
