"use client";

import {
  faTrashCan,
  faTrashCanArrowUp,
} from "@fortawesome/free-solid-svg-icons";

import { IconButton } from "@/components/iconButtons/IconButton";
import { WorkspacePageWrapper } from "@/components/pageWrappers/WorkspacePageWrapper";
import { Typography } from "@/components/Typography";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants/messages";
import {
  useRestoreEntry,
  useSoftDeleteEntry,
  useTrashedEntries,
} from "@/hooks/cache/entries";
import { Entry } from "@/models/Entry";
import { showErrorToast, showSuccessToast } from "@/utils/client/toasts";

import { NotebooksSection } from "./NotebooksSection";

export const TrashContent = () => {
  const { data: entries } = useTrashedEntries();
  const { mutateAsync: restoreEntry } = useRestoreEntry();
  const { mutateAsync: softDeleteEntry } = useSoftDeleteEntry();

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
    <WorkspacePageWrapper>
      <NotebooksSection />

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
    </WorkspacePageWrapper>
  );
};
