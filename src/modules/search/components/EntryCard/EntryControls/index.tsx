import { JSX } from "react";
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
  useUnsaveEntry,
} from "@/hooks/cache/entries";
import { Entry } from "@/models/Entry";
import { apiTrashEntry } from "@/services/entries/update";
import { isError } from "@/utils/client/isError";
import { showErrorToast, showSuccessToast } from "@/utils/client/toasts";

import { EntryControl } from "./types";

type EntryControlsProps = {
  entry: Entry;
  controls: EntryControl[];
  queryKey: QueryKey;
};

export const EntryControls = ({
  entry,
  controls,
  queryKey,
}: EntryControlsProps) => {
  const { mutateAsync: restoreEntry } = useRestoreEntry();
  const { mutateAsync: softDeleteEntry } = useSoftDeleteEntry();
  const { mutateAsync: saveEntry } = useSaveEntry(queryKey);
  const { mutateAsync: unsaveEntry } = useUnsaveEntry(queryKey);

  const handleSaveEntry = async ({ id }: Entry) => {
    try {
      await saveEntry(id);
      showSuccessToast(SUCCESS_MESSAGES.USER.CREATE.SAVED_ITEM.ENTRY);
    } catch (err) {
      console.error(err);
      showErrorToast(ERROR_MESSAGES.USER.CREATE.SAVED_ITEM.ENTRY);
    }
  };

  const handleUnsaveEntry = async ({ id }: Entry) => {
    try {
      await unsaveEntry(id);
      showSuccessToast(SUCCESS_MESSAGES.USER.DELETE.SAVED_ITEM.ENTRY);
    } catch (err) {
      console.error(err);
      showErrorToast(isError(err) ? err.message : DEFAULT_ERROR_MSG);
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

  const handleTrashEntry = async ({ id, title }: Entry) => {
    if (!confirm(`Trash entry: ${title}?`)) {
      return;
    }

    try {
      // TODO: create mutation hook
      await apiTrashEntry(id);
      showSuccessToast(SUCCESS_MESSAGES.USER.TRASH.ENTRY);
    } catch (err) {
      console.error(err);
      showErrorToast(ERROR_MESSAGES.USER.TRASH.ENTRY);
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

  const controlMap: Record<EntryControl, JSX.Element> = {
    edit: (
      <LinkIconButton
        faIcon={faEdit}
        href={routes.entryEdit(entry)}
        key="edit"
      />
    ),
    saving: entry.saved ? (
      <IconButton
        faIcon={faBookmark}
        onClick={() => handleUnsaveEntry(entry)}
        key="unsave"
      />
    ) : (
      <IconButton
        faIcon={faBookmarkEmpty}
        onClick={() => handleSaveEntry(entry)}
        key="save"
      />
    ),
    restore: (
      <IconButton
        onClick={() => handleRestoreEntry(entry)}
        faIcon={faTrashCanArrowUp}
        textVariant="positive"
        key="restore"
      />
    ),
    trash: (
      <IconButton
        faIcon={faTrashCan}
        textVariant="negative"
        onClick={() => handleTrashEntry(entry)}
        key="trash"
      />
    ),
    delete: (
      <IconButton
        onClick={() => handleSoftDeleteEntry(entry)}
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
