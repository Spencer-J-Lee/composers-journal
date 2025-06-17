import { faBookmark as faBookmarkEmpty } from "@fortawesome/free-regular-svg-icons";
import {
  faBookmark,
  faEdit,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import { IconButton } from "@/components/iconButtons/IconButton";
import {
  DEFAULT_ERROR_MSG,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "@/constants/messages";
import { Entry } from "@/models/Entry";
import { apiTrashEntry } from "@/services/entries";
import {
  apiCreateSavedEntry,
  apiDeleteSavedEntry,
} from "@/services/savedItems";
import { isError } from "@/utils/isError";
import { showErrorToast, showSuccessToast } from "@/utils/toasts";

type EntryControlsProps = {
  entry: Entry;
};

export const EntryControls = ({ entry }: EntryControlsProps) => {
  const trashEntry = async ({ id, title }: Entry) => {
    if (!confirm(`Trash entry: ${title}?`)) {
      return;
    }

    try {
      await apiTrashEntry({ id });
      showSuccessToast(SUCCESS_MESSAGES.USER.TRASH.ENTRY);
    } catch (err) {
      console.error(err);
      showErrorToast(ERROR_MESSAGES.USER.TRASH.ENTRY);
    }
  };

  const saveEntry = async ({ id }: Entry) => {
    try {
      await apiCreateSavedEntry(id);
      showSuccessToast(SUCCESS_MESSAGES.USER.CREATE.SAVED_ITEM.ENTRY);
    } catch (err) {
      console.error(err);
      showErrorToast(ERROR_MESSAGES.USER.CREATE.SAVED_ITEM.ENTRY);
    }
  };

  const unsaveEntry = async ({ id }: Entry) => {
    try {
      await apiDeleteSavedEntry(id);
      showSuccessToast(SUCCESS_MESSAGES.USER.DELETE.SAVED_ITEM.ENTRY);
    } catch (err) {
      console.error(err);
      showErrorToast(isError(err) ? err.message : DEFAULT_ERROR_MSG);
    }
  };

  return (
    <div className="flex flex-col items-center gap-1 p-2">
      {/* TODO: add logic for bookmark dual state */}
      <IconButton faIcon={faBookmarkEmpty} onClick={() => saveEntry(entry)} />
      <IconButton faIcon={faBookmark} onClick={() => unsaveEntry(entry)} />
      <IconButton faIcon={faEdit} />
      <IconButton
        faIcon={faTrashCan}
        textVariant="negative"
        onClick={() => trashEntry(entry)}
      />
    </div>
  );
};
