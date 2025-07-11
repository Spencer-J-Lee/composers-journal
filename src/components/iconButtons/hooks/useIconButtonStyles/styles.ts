import { IconButtonTextVariant } from "../../types";

export const widthHeightClassName = "h-9 w-9";

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
