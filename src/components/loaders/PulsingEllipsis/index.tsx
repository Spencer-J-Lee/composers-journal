import clsx from "clsx";

import { variantClassNames } from "./styles";
import { PulsingEllipsisVariant } from "./types";

type PulsingEllipsisProps = {
  variant?: PulsingEllipsisVariant;
};

export const PulsingEllipsis = ({
  variant = "default",
}: PulsingEllipsisProps) => {
  return (
    <span className="flex items-center gap-x-0.5">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <span
            className={clsx(
              "animate-pulsing-ellipsis inline-block h-1.5 w-1.5 rounded-full",
              variantClassNames[variant],
            )}
            style={{ animationDelay: `${i * 0.2}s` }}
            key={i}
          />
        ))}
    </span>
  );
};
