import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type IconButtonTextVariant = "default" | "positive" | "negative";

export type BaseIconButtonProps = {
  faIcon: IconProp;
  textVariant?: IconButtonTextVariant;
  active?: boolean;
};
