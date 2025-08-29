import { EmptyState, EmptyStateProps } from "./EmptyState";
import { WorkspacePageWrapper } from "../pageWrappers/WorkspacePageWrapper";

type WorkspaceEmptyStateProps = EmptyStateProps;

export const WorkspaceEmptyState = (props: WorkspaceEmptyStateProps) => {
  return (
    <WorkspacePageWrapper>
      <div className="flex min-h-full w-full items-center justify-center">
        <EmptyState {...props} />
      </div>
    </WorkspacePageWrapper>
  );
};
