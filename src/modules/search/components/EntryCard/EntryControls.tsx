import { faBookmark as faBookmarkEmpty } from "@fortawesome/free-regular-svg-icons";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { IconButton } from "@/components/iconButtons/IconButton";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants/messages";
import { Entry } from "@/models/Entry";
import { apiTrashEntry } from "@/services/entries";
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

  return (
    <div className="flex flex-col items-center gap-1 p-2">
      {/* TODO: add logic for bookmark dual state */}
      <IconButton faIcon={faBookmarkEmpty} />
      <IconButton faIcon={faEdit} />
      <IconButton
        faIcon={faTrashCan}
        textVariant="negative"
        onClick={() => trashEntry(entry)}
      />
    </div>
  );
};
