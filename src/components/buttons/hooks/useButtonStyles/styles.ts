import { ButtonSize, ButtonVariant } from "../../types";

export const sizeClassName: Record<ButtonSize, string> = {
  sm: "px-2 py-1 text-xs",
  md: "px-4 py-2 text-sm",
};

export const variantClassName: Record<ButtonVariant, string> = {
  default: "text-text bg-accent",
  positive: "text-text bg-positive",
  negative: "text-text bg-negative",
  ghost: "text-text bg-surface",
};

export const hoverActiveClassName: Record<ButtonVariant, string> = {
  default:
    "hover:brightness-90 focus-visible:brightness-90 active:brightness-80",
  positive:
    "hover:brightness-90 focus-visible:brightness-90 active:brightness-80",
  negative:
    "hover:brightness-90 focus-visible:brightness-90 active:brightness-80",
  ghost:
    "hover:brightness-125 focus-visible:brightness-125 active:brightness-[1.4]",
};

export const forceActiveClassName: Record<ButtonVariant, string> = {
  default: "brightness-80",
  positive: "brightness-80",
  negative: "brightness-80",
  ghost: "brightness-[1.4]",
};

export const getHoverActiveClassName = (
  variant: ButtonVariant,
  isActive?: boolean,
) => {
  return isActive
    ? forceActiveClassName[variant]
    : hoverActiveClassName[variant];
};
