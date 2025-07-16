import { ReactNode } from "react";
import clsx from "clsx";

type SidebarMenuContainerProps = {
  children: ReactNode;
  className?: string;
};

export const SidebarMenuContainer = ({
  children,
  className,
}: SidebarMenuContainerProps) => {
  return (
    <ul className={clsx("flex-overflow-fix space-y-1.5 px-4 py-4", className)}>
      {children}
    </ul>
  );
};
