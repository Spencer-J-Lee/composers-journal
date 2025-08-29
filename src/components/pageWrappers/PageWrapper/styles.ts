import { MaxWidth, PaddingSize } from "./types";

/** @deprecated */
export const maxWidthClassName: Record<MaxWidth, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-3xl",
  xl: "max-w-5xl",
  none: "",
};

export const paddingClassName: Record<PaddingSize, string> = {
  md: "lg:p-8 p-4",
};
