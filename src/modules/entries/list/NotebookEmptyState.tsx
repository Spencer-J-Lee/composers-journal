import { LinkButton } from "@/components/buttons/LinkButton";
import { WorkspacePageWrapper } from "@/components/pageWrappers/WorkspacePageWrapper";
import { ASSET_PATHS } from "@/constants/assetPaths";
import { routes } from "@/constants/routes";

import { EmptyState } from "../../../components/EmptyState";

export type NotebookEmptyStateProps = {
  notebookId: number;
};

export const NotebookEmptyState = ({ notebookId }: NotebookEmptyStateProps) => {
  return (
    <WorkspacePageWrapper>
      <div className="flex min-h-full w-full items-center justify-center">
        <EmptyState
          imageData={{
            src: ASSET_PATHS.EMPTY_STATE_WRITING,
            alt: "Cartoon character writing lines with giant pencil.",
          }}
          title="No entries yet"
          description="Start by creating a new one"
        >
          <LinkButton href={routes.entryCreate(notebookId)}>
            Get Started
          </LinkButton>
        </EmptyState>
      </div>
    </WorkspacePageWrapper>
  );
};
