"use client";

import clsx from "clsx";

import { useSidebarLinkProps } from "./hooks/useSidebarLinkProps";
import {
  LinkIconButton,
  LinkIconButtonProps,
} from "../iconButtons/LinkIconButton";

type SidebarLinkIconButtonProps = LinkIconButtonProps;

export const SidebarLinkIconButton = ({
  className,
  ...props
}: SidebarLinkIconButtonProps) => {
  const { activeClassName, isActive } = useSidebarLinkProps(props.href);

  return (
    <LinkIconButton
      className={clsx(activeClassName, className)}
      isActive={isActive}
      {...props}
    />
  );
};
