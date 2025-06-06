import clsx from "clsx";

import { useSidebarLinkStyles } from "./hooks/useSidebarButtonStyles";
import { LinkButton, LinkButtonProps } from "../buttons/LinkButton";

type SidebarLinkButtonProps = Omit<LinkButtonProps, "variant">;

export const SidebarLinkButton = ({
  children,
  className,
  ...props
}: SidebarLinkButtonProps) => {
  const { activeClassName } = useSidebarLinkStyles(props.href);

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
      {...props}
    >
      {children}
    </LinkButton>
  );
};
