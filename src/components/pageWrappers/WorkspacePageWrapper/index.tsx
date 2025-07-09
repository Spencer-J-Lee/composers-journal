import { ReactNode, Ref } from "react";
import clsx from "clsx";

import { ELEMENT_IDS } from "@/constants/elementIds";

import { paddingClassName } from "./styles";
import { PaddingSize } from "./types";

type WorkspacePageWrapperProps = {
  children: ReactNode;
  paddingSize?: PaddingSize;
  ref?: Ref<HTMLElement | null>;
};

export const WorkspacePageWrapper = ({
  children,
  paddingSize = "default",
  ref,
}: WorkspacePageWrapperProps) => {
  return (
    <main
      id={ELEMENT_IDS.MAIN_CONTENT}
      className={clsx(
        "bg-background-light h-screen flex-1 overflow-y-scroll",
        paddingClassName[paddingSize],
      )}
      ref={ref}
    >
      {children}
    </main>
  );
};
