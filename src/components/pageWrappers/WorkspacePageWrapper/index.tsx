import { ReactNode, Ref } from "react";
import clsx from "clsx";

import { ELEMENT_IDS } from "@/constants/elementIds";

import { paddingXClassName, paddingYClassName } from "./styles";
import { PaddingSize } from "./types";

type WorkspacePageWrapperProps = {
  children: ReactNode;
  paddingSize?: PaddingSize;
  ref?: Ref<HTMLElement | null>;
};

export const WorkspacePageWrapper = ({
  children,
  paddingSize = "md",
  ref,
}: WorkspacePageWrapperProps) => {
  return (
    <main
      id={ELEMENT_IDS.MAIN_CONTENT}
      className={clsx(
        "bg-background-light h-screen flex-1 overflow-y-scroll",
        paddingXClassName[paddingSize],
        paddingYClassName[paddingSize],
      )}
      ref={ref}
    >
      {children}
    </main>
  );
};
