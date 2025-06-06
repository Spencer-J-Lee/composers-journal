"use client";

import clsx from "clsx";

import {
  LinkIconButton,
  LinkIconButtonProps,
} from "../iconButtons/LinkIconButton";
import { useSidebarLinkStyles } from "./hooks/useSidebarButtonStyles";

type SidebarLinkIconButtonProps = LinkIconButtonProps;

export const SidebarLinkIconButton = ({
  className,
  ...props
}: SidebarLinkIconButtonProps) => {
  const { activeClassName } = useSidebarLinkStyles(props.href);

  return (
    <LinkIconButton className={clsx(activeClassName, className)} {...props} />
  );
};
