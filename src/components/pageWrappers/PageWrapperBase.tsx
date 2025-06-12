import { ReactNode } from "react";
import clsx from "clsx";

import { ELEMENT_IDS } from "@/constants/elementIds";

export type PageWrapperBaseProps = {
  children: ReactNode;
  className?: string;
};

export const PageWrapperBase = ({
  children,
  className,
}: PageWrapperBaseProps) => {
  return (
    <main
      id={ELEMENT_IDS.MAIN_CONTENT}
      className={clsx("min-h-[calc(100vh)-var(--navbar-height)]", className)}
    >
      {children}
    </main>
  );
};
