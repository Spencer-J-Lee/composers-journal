import { EmptyState, EmptyStateProps } from "./EmptyState";
import { WorkspacePageWrapper } from "../pageWrappers/WorkspacePageWrapper";

type WorkspaceEmptyStatePageProps = EmptyStateProps;

export const WorkspaceEmptyStatePage = (
  props: WorkspaceEmptyStatePageProps,
) => {
  return (
    <WorkspacePageWrapper>
      <div className="flex min-h-full w-full items-center justify-center">
        <EmptyState {...props} />
      </div>
    </WorkspacePageWrapper>
  );
};
