import { MouseEventHandler } from "react";

import { Button, ButtonProps } from "@/components/buttons/Button";

type RichTextMenuButtonProps = {
  isActive?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
} & Omit<ButtonProps, "variant" | "size">;

export const RichTextMenuButton = ({
  children,
  isActive,
  onClick,
  ...props
}: RichTextMenuButtonProps) => {
  return (
    <Button
      {...props}
      onClick={onClick}
      variant={isActive ? "positive" : "default"}
      size="sm"
    >
      {children}
    </Button>
  );
};
