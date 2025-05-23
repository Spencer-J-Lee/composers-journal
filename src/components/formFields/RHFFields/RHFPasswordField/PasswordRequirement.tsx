import { useMemo } from "react";
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
  const { icon, colorClassName, spacingClassName } = useMemo(
    () => ({
      icon: fulfilled ? faCheck : faXmark,
      colorClassName: fulfilled ? "text-positive" : "text-negative",
      spacingClassName: fulfilled ? "" : "mt-0.5", // Helps to vertically center xmark icon
    }),
    [fulfilled],
  );

  return (
    <div className="flex items-center">
      <FontAwesomeIcon
        icon={icon}
        size="sm"
        className={clsx("mr-1.5 h-3 w-3", colorClassName, spacingClassName)}
      />
      <span className="text-sm">{text}</span>
    </div>
  );
};
