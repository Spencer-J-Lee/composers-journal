import { ReactNode } from "react";
import clsx from "clsx";

import { ELEMENT_IDS } from "@/constants/elementIds";

import { paddingClassName } from "./styles";
import { PaddingSize } from "./types";

type WorkspacePageWrapperProps = {
  children: ReactNode;
  paddingSize?: PaddingSize;
};

export const WorkspacePageWrapper = ({
  children,
  paddingSize = "default",
}: WorkspacePageWrapperProps) => {
  return (
    <main
      id={ELEMENT_IDS.MAIN_CONTENT}
      className={clsx(
        "bg-background-light h-screen flex-1 overflow-y-auto",
        paddingClassName[paddingSize],
      )}
    >
      {children}
    </main>
  );
};
