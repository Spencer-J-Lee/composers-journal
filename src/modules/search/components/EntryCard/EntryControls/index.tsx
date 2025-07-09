import { JSX, useState } from "react";
import { faBookmark as faBookmarkEmpty } from "@fortawesome/free-regular-svg-icons";
import {
  faBookmark,
  faEdit,
  faTrashCan,
  faTrashCanArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { QueryKey } from "@tanstack/react-query";

import { IconButton } from "@/components/iconButtons/IconButton";
import { LinkIconButton } from "@/components/iconButtons/LinkIconButton";
import {
  DEFAULT_ERROR_MSG,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "@/constants/messages";
import { routes } from "@/constants/routes";
import {
  useRestoreEntry,
  useSaveEntry,
  useSoftDeleteEntry,
  useTrashEntry,
  useUnsaveEntry,
} from "@/hooks/cache/entries";
import { Entry } from "@/models/Entry";
import { isError } from "@/utils/client/isError";
import { showErrorToast, showSuccessToast } from "@/utils/client/toasts";

import { EntryControl } from "./types";

type EntryControlsProps = {
  entry: Entry;
  controls: EntryControl[];
  queryKey: QueryKey;
  onTrashSuccess?: () => void;
};

export const EntryControls = ({
  entry,
  controls,
  queryKey,
  onTrashSuccess,
}: EntryControlsProps) => {
  const { mutateAsync: restoreEntry } = useRestoreEntry();
  const { mutateAsync: softDeleteEntry } = useSoftDeleteEntry();
  const { mutateAsync: saveEntry } = useSaveEntry(queryKey);
  const { mutateAsync: unsaveEntry } = useUnsaveEntry(queryKey);
  const { mutateAsync: trashEntry } = useTrashEntry(queryKey, onTrashSuccess);
  const [loadingState, setLoadingState] = useState({
    saving: false,
    unsaving: false,
    restoring: false,
    trashing: false,
    deleting: false,
  });
  const actionPending = Object.values(loadingState).some((state) => state);

  const handleSaveEntry = async ({ id }: Entry) => {
    setLoadingState((prev) => ({ ...prev, saving: true }));

    try {
      await saveEntry(id);
      showSuccessToast(SUCCESS_MESSAGES.USER.CREATE.SAVED_ITEM.ENTRY);
    } catch (err) {
      console.error(err);
      showErrorToast(ERROR_MESSAGES.USER.CREATE.SAVED_ITEM.ENTRY);
    }

    setLoadingState((prev) => ({ ...prev, saving: false }));
  };

  const handleUnsaveEntry = async ({ id }: Entry) => {
    setLoadingState((prev) => ({ ...prev, unsaving: true }));

    try {
      await unsaveEntry(id);
      showSuccessToast(SUCCESS_MESSAGES.USER.DELETE.SAVED_ITEM.ENTRY);
    } catch (err) {
      console.error(err);
      showErrorToast(isError(err) ? err.message : DEFAULT_ERROR_MSG);
    }

    setLoadingState((prev) => ({ ...prev, unsaving: false }));
  };

  const handleRestoreEntry = async ({ id, title }: Entry) => {
    if (!confirm(`Restore entry: ${title}?`)) {
      return;
    }
    setLoadingState((prev) => ({ ...prev, restoring: true }));

    try {
      await restoreEntry(id);
      showSuccessToast(SUCCESS_MESSAGES.USER.RESTORE.ENTRY);
    } catch (err) {
      console.error(err);
      showErrorToast(ERROR_MESSAGES.USER.RESTORE.ENTRY);
    }

    setLoadingState((prev) => ({ ...prev, restoring: false }));
  };

  const handleTrashEntry = async ({ id, title }: Entry) => {
    if (!confirm(`Trash entry: ${title}?`)) {
      return;
    }
    setLoadingState((prev) => ({ ...prev, trashing: true }));

    try {
      await trashEntry(id);
      showSuccessToast(SUCCESS_MESSAGES.USER.TRASH.ENTRY);
    } catch (err) {
      console.error(err);
      showErrorToast(ERROR_MESSAGES.USER.TRASH.ENTRY);
    }

    setLoadingState((prev) => ({ ...prev, trashing: false }));
  };

  const handleSoftDeleteEntry = async ({ id, title }: Entry) => {
    if (!confirm(`Delete entry: ${title}?`)) {
      return;
    }
    setLoadingState((prev) => ({ ...prev, deleting: true }));

    try {
      await softDeleteEntry(id);
      showSuccessToast(SUCCESS_MESSAGES.USER.DELETE.ENTRY);
    } catch (err) {
      console.error(err);
      showErrorToast(ERROR_MESSAGES.USER.DELETE.ENTRY);
    }

    setLoadingState((prev) => ({ ...prev, deleting: false }));
  };

  const controlMap: Record<EntryControl, JSX.Element> = {
    edit: (
      <LinkIconButton
        href={routes.entryEdit(entry)}
        faIcon={faEdit}
        key="edit"
      />
    ),
    saving: entry.saved ? (
      <IconButton
        onClick={() => handleUnsaveEntry(entry)}
        loading={loadingState.unsaving}
        disabled={actionPending}
        faIcon={faBookmark}
        key="unsave"
      />
    ) : (
      <IconButton
        onClick={() => handleSaveEntry(entry)}
        loading={loadingState.saving}
        disabled={actionPending}
        faIcon={faBookmarkEmpty}
        key="save"
      />
    ),
    restore: (
      <IconButton
        onClick={() => handleRestoreEntry(entry)}
        loading={loadingState.restoring}
        disabled={actionPending}
        faIcon={faTrashCanArrowUp}
        textVariant="positive"
        key="restore"
      />
    ),
    trash: (
      <IconButton
        onClick={() => handleTrashEntry(entry)}
        loading={loadingState.trashing}
        disabled={actionPending}
        faIcon={faTrashCan}
        textVariant="negative"
        key="trash"
      />
    ),
    delete: (
      <IconButton
        onClick={() => handleSoftDeleteEntry(entry)}
        loading={loadingState.deleting}
        disabled={actionPending}
        faIcon={faTrashCan}
        textVariant="negative"
        key="delete"
      />
    ),
  };

  return (
    <div className="flex flex-col items-center gap-1 p-2">
      {/* TODO: add logic for bookmark dual state */}
      {controls.map((control) => controlMap[control])}
    </div>
  );
};
