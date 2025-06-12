export type ButtonSize = "sm" | "md";
export type ButtonVariant = "default" | "positive" | "negative" | "ghost";

export type BaseButtonProps = {
  size?: ButtonSize;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  loading?: boolean;
  isActive?: boolean;
};
