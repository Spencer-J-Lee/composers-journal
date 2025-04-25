import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { EntryControlButton } from "./EntryControlButton";

interface EntryControlsProps {}

export const EntryControls = ({}: EntryControlsProps) => {
  return (
    <div className="text-accent flex flex-col items-center gap-0.5 p-2">
      <EntryControlButton icon={faStar} />
      <EntryControlButton icon={faEdit} />
      <EntryControlButton icon={faTrash} />
    </div>
  );
};
