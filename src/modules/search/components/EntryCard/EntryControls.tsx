import { faBookmark as faBookmarkEmpty } from "@fortawesome/free-regular-svg-icons";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { IconButton } from "@/components/iconButtons/IconButton";

export const EntryControls = () => {
  return (
    <div className="flex flex-col items-center gap-1 p-2">
      {/* TODO: add logic for bookmark dual state */}
      <IconButton faIcon={faBookmarkEmpty} />
      <IconButton faIcon={faEdit} />
      <IconButton faIcon={faTrashCan} variant="negative" />
    </div>
  );
};
