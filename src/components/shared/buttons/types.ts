export type ButtonSize = "sm" | "md";
export type ButtonVariant = "default" | "CTA" | "danger";

export interface BaseButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
}
