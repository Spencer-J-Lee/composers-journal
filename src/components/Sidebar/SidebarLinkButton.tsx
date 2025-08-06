import clsx from "clsx";

import { useSidebarLinkProps } from "./hooks/useSidebarLinkProps";
import { LinkButton, LinkButtonProps } from "../buttons/LinkButton";

type SidebarLinkButtonProps = Omit<LinkButtonProps, "variant">;

export const SidebarLinkButton = ({
  children,
  className,
  ...props
}: SidebarLinkButtonProps) => {
  const { activeClassName, active } = useSidebarLinkProps(props.href);

  return (
    <LinkButton
      className={clsx(
        "overflow-x-hidden text-ellipsis whitespace-nowrap",
        {
          "pl-2.5": !!props.faIcon,
        },
        activeClassName,
        className,
      )}
      variant="ghost"
      active={active}
      {...props}
    >
      {children}
    </LinkButton>
  );
};
