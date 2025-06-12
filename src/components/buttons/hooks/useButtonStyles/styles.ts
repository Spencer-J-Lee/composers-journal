import { ButtonSize, ButtonVariant } from "../../types";

export const sizeClassName: Record<ButtonSize, string> = {
  sm: "px-2 py-1 text-xs",
  md: "px-4 py-2 text-sm",
};

export const variantClassNames: Record<
  ButtonVariant,
  Record<string, string>
> = {
  default: {
    base: "bg-accent text-text",
    disabled: "bg-accent-disabled cursor-not-allowed text-text-disabled",
    notActive:
      "hover:brightness-90 focus-visible:brightness-90 active:brightness-80",
    active: "brightness-80",
  },
  positive: {
    base: "bg-positive text-text",
    disabled: "bg-positive-disabled cursor-not-allowed text-text-disabled",
    notActive:
      "hover:brightness-90 focus-visible:brightness-90 active:brightness-80",
    active: "brightness-80",
  },
  negative: {
    base: "bg-negative text-text",
    disabled: "bg-negative-disabled cursor-not-allowed text-text-disabled",
    notActive:
      "hover:brightness-90 focus-visible:brightness-90 active:brightness-80",
    active: "brightness-80",
  },
  ghost: {
    base: "bg-surface text-text",
    disabled: "bg-[#282829] cursor-not-allowed text-text-disabled",
    notActive:
      "hover:brightness-125 focus-visible:brightness-125 active:brightness-[1.4]",
    active: "brightness-[1.4]",
  },
};
