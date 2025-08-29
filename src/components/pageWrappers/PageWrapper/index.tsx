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
        "flex-overflow-fix bg-background-light",
        paddingClassName[paddingSize],
        className,
      )}
    >
      <div className={clsx("mx-auto w-full", maxWidthClassName[maxWidth])}>
        {children}
      </div>
    </main>
  );
};
