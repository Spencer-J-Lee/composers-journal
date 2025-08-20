import { ReactNode } from "react";
import clsx from "clsx";

import {
  WORKSPACE_WRAPPER_PX,
  WORKSPACE_WRAPPER_PY,
} from "../pageWrappers/WorkspacePageWrapper/styles";

type WorkspaceContentWrapperProps = {
  children: ReactNode;
};

/**
 * Intended to be used with WorkspacePageWrapper with `paddingSize="none"`
 */
export const WorkspaceContentWrapper = ({
  children,
}: WorkspaceContentWrapperProps) => {
  return (
    <div className={clsx(WORKSPACE_WRAPPER_PX, WORKSPACE_WRAPPER_PY)}>
      {children}
    </div>
  );
};
