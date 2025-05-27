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
        className={clsx("mr-1.5 h-3 w-3", {
          "text-positive": fulfilled,
          "text-negative mt-0.5": !fulfilled,
        })}
      />
      <span className="text-sm">{text}</span>
    </div>
  );
};
