import { IconButtonTextVariant } from "../../types";

export const textVariantClassName: Record<IconButtonTextVariant, string> = {
  default: "text-text-muted",
  positive: "text-positive",
  negative: "text-negative",
};

export const disabledTextVariantClassName: Record<
  IconButtonTextVariant,
  string
> = {
  default: "text-[#4e5157]",
  positive: "text-[#497451]",
  negative: "text-[#8e3538]",
};
