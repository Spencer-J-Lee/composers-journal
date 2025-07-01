import { ReactNode } from "react";
import clsx from "clsx";

import { ELEMENT_IDS } from "@/constants/elementIds";

import { maxWidthClassName } from "./styles";
import { MaxWidth } from "./types";

type PageWrapperProps = {
  children: ReactNode;
  maxWidth: MaxWidth;
  className?: string;
};

export const PageWrapper = ({
  children,
  className,
  maxWidth,
}: PageWrapperProps) => {
  return (
    <main
      id={ELEMENT_IDS.MAIN_CONTENT}
      className={clsx(
        "min-h-[calc(100vh)-var(--navbar-height)] min-w-0",
        className,
      )}
    >
      <div className={clsx("w-full", maxWidthClassName[maxWidth])}>
        {children}
      </div>
    </main>
  );
};
