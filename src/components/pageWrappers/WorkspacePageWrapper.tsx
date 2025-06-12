import { ReactNode } from "react";

import { PageWrapperBase } from "./PageWrapperBase";

type EntryPageWrapperProps = {
  children: ReactNode;
};

export const WorkspacePageWrapper = ({ children }: EntryPageWrapperProps) => {
  return <PageWrapperBase className="p-4">{children}</PageWrapperBase>;
};
