import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

type PasswordRequirementProps = {
  text: string;
  fulfilled: boolean;
};

export const PasswordRequirement = ({
  text,
  fulfilled,
}: PasswordRequirementProps) => {
  return (
    <div className="flex items-center">
      <FontAwesomeIcon
        icon={fulfilled ? faCheck : faXmark}
        size="sm"
        className={clsx(
          "mr-1.5 h-3 w-3",
          fulfilled ? "text-positive" : "text-negative mt-0.5",
        )}
      />
      <span className="text-sm">{text}</span>
    </div>
  );
};
