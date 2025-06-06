import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type IconButtonVariant = "default" | "positive" | "negative";

export type BaseIconButtonProps = {
  faIcon: IconProp;
  variant?: IconButtonVariant;
};
