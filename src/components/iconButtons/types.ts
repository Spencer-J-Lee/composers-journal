import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type IconButtonTextVariant = "default" | "positive" | "negative";

export type IconButtonSize = "sm" | "md";

export type BaseIconButtonProps = {
  faIcon: IconProp;
  textVariant?: IconButtonTextVariant;
  size?: IconButtonSize;
  active?: boolean;
};
