export type ButtonSize = "sm" | "md";
export type ButtonVariant = "default" | "positive" | "negative";

export type BaseButtonProps = {
  size?: ButtonSize;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  loading?: boolean;
};
