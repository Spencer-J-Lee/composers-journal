import clsx from "clsx";

import { PaddingSize } from "./types";

export const WORKSPACE_WRAPPER_PX = "px-4 lg:px-8";
export const WORKSPACE_WRAPPER_PY = "py-4 lg:py-6";

export const paddingClassName: Record<PaddingSize, string> = {
  default: clsx(WORKSPACE_WRAPPER_PX, WORKSPACE_WRAPPER_PY),
  none: "",
};
