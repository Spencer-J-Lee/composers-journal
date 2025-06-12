import clsx from "clsx";

import { ghostButtonStyles } from "@/components/styles/buttons";

import { ButtonSize, ButtonVariant } from "../../types";

export const sizeClassName: Record<ButtonSize, string> = {
  sm: "px-2 py-1 text-xs",
  md: "px-4 py-2 text-sm",
};

export const variantClassName: Record<ButtonVariant, string> = {
  default:
    "text-text bg-accent hover:brightness-90 focus-visible:brightness-90",
  positive:
    "text-text bg-positive hover:brightness-90 focus-visible:brightness-90",
  negative:
    "text-text bg-negative hover:brightness-90 focus-visible:brightness-90",
  ghost: clsx("text-text bg-surface", ghostButtonStyles.forHoverActive),
};
