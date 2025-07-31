import { JSX } from "react";
import { faBookmark as faBookmarkEmpty } from "@fortawesome/free-regular-svg-icons";
import {
  faBookmark,
  faEdit,
  faTrashCan,
  faTrashCanArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { QueryKey } from "@tanstack/react-query";

import { commonAlertActions } from "@/components/dialogs/AlertDialog/constants";
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
import { useAlert } from "@/hooks/useAlert";
import { Entry } from "@/models/Entry";
import { isError } from "@/utils/client/isError";
import { genDeleteMsg } from "@/utils/client/messages";
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
  const { openAlert } = useAlert();
  const { mutateAsync: restoreEntry, isPending: isRestorePending } =
    useRestoreEntry();
  const { mutateAsync: softDeleteEntry, isPending: isSoftDeletePending } =
    useSoftDeleteEntry();
  const { mutateAsync: saveEntry, isPending: isSavePending } =
    useSaveEntry(queryKey);
  const { mutateAsync: unsaveEntry, isPending: isUnsavePending } =
    useUnsaveEntry(queryKey);
  const { mutateAsync: trashEntry, isPending: isTrashPending } = useTrashEntry(
    queryKey,
    onTrashSuccess,
  );
  const actionPending =
    isRestorePending ||
    isSoftDeletePending ||
    isSavePending ||
    isUnsavePending ||
    isTrashPending;

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

  const handleRestoreEntry = async ({ id }: Entry) => {
    try {
      await restoreEntry(id);
      showSuccessToast(SUCCESS_MESSAGES.USER.RESTORE.ENTRY);
    } catch (err) {
      console.error(err);
      showErrorToast(ERROR_MESSAGES.USER.RESTORE.ENTRY);
    }
  };

  const handleTrashEntry = async ({ id, title }: Entry) => {
    openAlert({
      title: (
        <>
          Trash <i>{title}</i>?
        </>
      ),
      actions: [
        commonAlertActions.cancel,
        {
          type: "async",
          key: "confirm",
          text: "Confirm",
          variant: "negative",
          onConfirm: () => trashEntry(id),
          successMsg: SUCCESS_MESSAGES.USER.TRASH.ENTRY,
          errMsg: ERROR_MESSAGES.USER.TRASH.ENTRY,
        },
      ],
    });
  };

  const handleSoftDeleteEntry = async ({ id, title }: Entry) => {
    openAlert({
      title: "Are you sure?",
      description: genDeleteMsg(title),
      actions: [
        commonAlertActions.cancel,
        {
          type: "async",
          key: "confirm",
          text: "Confirm",
          variant: "negative",
          onConfirm: () => softDeleteEntry(id),
          successMsg: SUCCESS_MESSAGES.USER.DELETE.ENTRY,
          errMsg: ERROR_MESSAGES.USER.DELETE.ENTRY,
        },
      ],
    });
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
        loading={isUnsavePending}
        disabled={actionPending}
        faIcon={faBookmark}
        key="unsave"
      />
    ) : (
      <IconButton
        onClick={() => handleSaveEntry(entry)}
        loading={isSavePending}
        disabled={actionPending}
        faIcon={faBookmarkEmpty}
        key="save"
      />
    ),
    restore: (
      <IconButton
        onClick={() => handleRestoreEntry(entry)}
        loading={isRestorePending}
        disabled={actionPending}
        faIcon={faTrashCanArrowUp}
        textVariant="positive"
        key="restore"
      />
    ),
    trash: (
      <IconButton
        onClick={() => handleTrashEntry(entry)}
        loading={isTrashPending}
        disabled={actionPending}
        faIcon={faTrashCan}
        textVariant="negative"
        key="trash"
      />
    ),
    delete: (
      <IconButton
        onClick={() => handleSoftDeleteEntry(entry)}
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
