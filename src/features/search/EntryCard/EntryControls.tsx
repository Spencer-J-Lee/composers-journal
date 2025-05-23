import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import { IconButton } from "@/components/IconButton";

type EntryControlsProps = {};

export const EntryControls = ({}: EntryControlsProps) => {
  return (
    <div className="flex flex-col items-center gap-1 p-2">
      <IconButton faIcon={faStar} />
      <IconButton faIcon={faEdit} />
      <IconButton faIcon={faTrash} variant="negative" />
    </div>
  );
};
