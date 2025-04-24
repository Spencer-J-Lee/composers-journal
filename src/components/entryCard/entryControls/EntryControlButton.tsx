import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface EntryControlButtonProps {
  icon: IconProp;
}

export const EntryControlButton = ({ icon }: EntryControlButtonProps) => {
  return (
    <button className="bg-surface h-8 w-8 hover:brightness-[0.97] active:brightness-95">
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};
