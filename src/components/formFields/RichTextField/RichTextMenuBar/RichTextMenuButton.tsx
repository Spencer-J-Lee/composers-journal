import { MouseEventHandler } from "react";

import {
  IconButton,
  IconButtonProps,
} from "@/components/iconButtons/IconButton";

type RichTextMenuButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
} & Omit<IconButtonProps, "textVariant">;

export const RichTextMenuButton = ({
  onClick,
  ...props
}: RichTextMenuButtonProps) => {
  return <IconButton onClick={onClick} textVariant="default" {...props} />;
};
