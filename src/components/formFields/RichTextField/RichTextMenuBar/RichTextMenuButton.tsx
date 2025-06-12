import { MouseEventHandler } from "react";

import {
  IconButton,
  IconButtonProps,
} from "@/components/iconButtons/IconButton";

type RichTextMenuButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
} & Omit<IconButtonProps, "variant">;

export const RichTextMenuButton = ({
  onClick,
  ...props
}: RichTextMenuButtonProps) => {
  return <IconButton onClick={onClick} variant="default" {...props} />;
};
