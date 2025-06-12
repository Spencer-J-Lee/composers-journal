import { ReactNode } from "react";

import { ELEMENT_IDS } from "@/constants/elementIds";

type EntryPageWrapperProps = {
  children: ReactNode;
};

export const WorkspacePageWrapper = ({ children }: EntryPageWrapperProps) => {
  return (
    <main
      id={ELEMENT_IDS.MAIN_CONTENT}
      className="bg-background-light h-screen flex-1 overflow-y-auto p-4"
    >
      {children}
    </main>
  );
};
