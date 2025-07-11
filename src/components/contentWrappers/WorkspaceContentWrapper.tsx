import { ReactNode } from "react";
import clsx from "clsx";

import { WORKSPACE_WRAPPER_PX } from "../pageWrappers/WorkspacePageWrapper/styles";

type WorkspaceContentWrapperProps = {
  children: ReactNode;
};

/**
 * Intended to be used with WorkspaceWrapper with `paddingSize="none"`
 */
export const WorkspaceContentWrapper = ({
  children,
}: WorkspaceContentWrapperProps) => {
  return <div className={clsx("pb-4", WORKSPACE_WRAPPER_PX)}>{children}</div>;
};
