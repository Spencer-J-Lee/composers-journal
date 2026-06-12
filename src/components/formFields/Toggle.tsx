import { ButtonHTMLAttributes } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import { FieldLabel } from "./FieldLabel";

export type ToggleProps = {
  name: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  faIcon?: IconDefinition;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "type">;

export const Toggle = ({
  name,
  label,
  checked,
  onChange,
  faIcon,
  className,
  ...props
}: ToggleProps) => {
  return (
    <div className="flex items-center justify-between">
      <FieldLabel htmlFor={name} className="mb-0">
        <span className="flex items-center gap-2">
          {faIcon && <FontAwesomeIcon icon={faIcon} />}
          {label}
        </span>
      </FieldLabel>
      <button
        id={name}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={clsx(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors",
          checked ? "bg-accent" : "bg-surface-light",
          className,
        )}
        {...props}
      >
        <span
          className={clsx(
            "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
            checked ? "translate-x-5" : "translate-x-0.5",
          )}
        />
      </button>
    </div>
  );
};
