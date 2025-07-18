import { ButtonVariant } from "@/components/buttons/types";

export type AlertAction = {
  text: string;
  variant: ButtonVariant;
  onClick: () => unknown;
};
