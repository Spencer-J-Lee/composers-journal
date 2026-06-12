import { IconButtonSize, IconButtonTextVariant } from "../../types";

export const widthHeightClassName: Record<IconButtonSize, string> = {
  sm: "h-10 w-10",
  md: "h-12 w-12",
};

export const textVariantClassName: Record<
  IconButtonTextVariant,
  Record<string, string>
> = {
  default: {
    base: "text-text-muted",
    disabled: "text-text-disabled",
  },
  positive: {
    base: "text-positive",
    disabled: "text-positive-disabled",
  },
  negative: {
    base: "text-negative",
    disabled: "text-negative-disabled",
  },
};
