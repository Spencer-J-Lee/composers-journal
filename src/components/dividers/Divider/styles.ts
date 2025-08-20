import { DividerOrientation, DividerSize } from "./types";

export const sizeClassName: Record<
  DividerOrientation,
  Record<DividerSize, string>
> = {
  horizontal: {
    sm: "border-b",
    md: "border-b-2",
  },
  vertical: {
    sm: "border-l",
    md: "border-l-2",
  },
};
