"use client";

import clsx from "clsx";

import { useSidebarLinkStyles } from "./hooks/useSidebarButtonStyles";
import {
  LinkIconButton,
  LinkIconButtonProps,
} from "../iconButtons/LinkIconButton";

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
