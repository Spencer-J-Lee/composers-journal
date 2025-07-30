import { PaddingSize } from "./types";

export const WORKSPACE_WRAPPER_PX = "px-4 lg:px-8";
export const WORKSPACE_WRAPPER_PY = "py-4 lg:py-6";

export const paddingXClassName: Record<PaddingSize, string> = {
  md: WORKSPACE_WRAPPER_PX,
  sm: "px-4",
  none: "",
};

export const paddingYClassName: Record<PaddingSize, string> = {
  md: WORKSPACE_WRAPPER_PY,
  sm: "py-4",
  none: "",
};
