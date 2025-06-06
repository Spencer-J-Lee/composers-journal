import { ReactNode } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import { LinkButton } from "../buttons/LinkButton";

type SidebarLinkButtonProps = {
  children: ReactNode;
  href: string;
  faIcon?: IconProp;
  className?: string;
};

export const SidebarLinkButton = ({
  children,
  href,
  faIcon,
  className,
}: SidebarLinkButtonProps) => {
  const pathname = usePathname();

  return (
    <LinkButton
      className={clsx(
        "overflow-x-hidden text-ellipsis whitespace-nowrap",
        {
          "pointer-events-none brightness-[1.4]": pathname === href,
          "pl-2.5": !!faIcon,
        },
        className,
      )}
      href={href}
      faIcon={faIcon}
      variant="ghost"
    >
      {children}
    </LinkButton>
  );
};
