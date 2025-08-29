import { ReactNode } from "react";
import clsx from "clsx";

import { ELEMENT_IDS } from "@/constants/elementIds";

import { paddingClassName } from "./styles";
import { PaddingSize } from "./types";

type PageWrapperProps = {
  children: ReactNode;
  paddingSize?: PaddingSize;
  className?: string;
};

export const PageWrapper = ({
  children,
  className,
  paddingSize = "md",
}: PageWrapperProps) => {
  return (
    <main
      id={ELEMENT_IDS.MAIN_CONTENT}
      className={clsx(
        "bg-background-light flex-overflow-fix flex min-h-[calc(100vh_-_var(--navbar-height))] flex-col",
        paddingClassName[paddingSize],
        className,
      )}
    >
      {children}
    </main>
  );
};
