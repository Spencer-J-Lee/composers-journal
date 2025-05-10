import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface EntryControlButtonProps {
  icon: IconProp;
}

export const EntryControlButton = ({ icon }: EntryControlButtonProps) => {
  return (
    <button className="bg-surface hover:bg-surface-hover hover:text-text h-8 w-8 rounded transition-colors duration-75">
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};
