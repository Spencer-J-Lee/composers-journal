import { ReactNode } from "react";
import clsx from "clsx";

import { WORKSPACE_WRAPPER_PX } from "./pageWrappers/WorkspacePageWrapper/styles";

type StickyTopBarProps = {
  children: ReactNode;
  className?: string;
};

export const StickyTopBar = ({ children, className }: StickyTopBarProps) => {
  return (
    <div
      className={clsx(
        "bg-background-light sticky top-0 gap-x-4 py-4",
        WORKSPACE_WRAPPER_PX,
        className,
      )}
    >
      {children}
    </div>
  );
};
