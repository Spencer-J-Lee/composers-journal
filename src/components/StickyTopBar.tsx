import { ReactNode } from "react";
import clsx from "clsx";

import { paddingXClassName } from "./pageWrappers/WorkspacePageWrapper/styles";
import { PaddingSize } from "./pageWrappers/WorkspacePageWrapper/types";

type StickyTopBarProps = {
  children: ReactNode;
  paddingSize?: PaddingSize;
  className?: string;
};

export const StickyTopBar = ({
  children,
  className,
  paddingSize = "md",
}: StickyTopBarProps) => {
  return (
    <div
      className={clsx(
        "bg-surface border-accent z-sticky-top-bar sticky top-0 gap-x-4 border-l-4 py-4 shadow-md",
        paddingXClassName[paddingSize],
        className,
      )}
    >
      {children}
    </div>
  );
};
