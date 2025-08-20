import clsx from "clsx";

import { sizeClassName } from "./styles";
import { DividerOrientation, DividerSize } from "./types";

type DividerProps = {
  orientation?: DividerOrientation;
  size?: DividerSize;
  className?: string;
  flexChild?: boolean;
};

export const Divider = ({
  className,
  orientation = "horizontal",
  size = "sm",
  flexChild,
}: DividerProps) => {
  if (orientation === "horizontal") {
    return (
      <div
        className={clsx(
          "border-border w-full",
          sizeClassName[orientation][size],
          className,
        )}
      />
    );
  }

  if (orientation === "vertical") {
    return (
      <div
        className={clsx(
          "border-border",
          flexChild ? "self-stretch" : "h-full",
          sizeClassName[orientation][size],
          className,
        )}
      />
    );
  }
};
