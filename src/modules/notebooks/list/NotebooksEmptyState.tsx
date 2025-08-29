import { LinkButton } from "@/components/buttons/LinkButton";
import { WorkspaceEmptyState } from "@/components/emptyStates/WorkspaceEmptyState";
import { ASSET_PATHS } from "@/constants/assetPaths";
import { routes } from "@/constants/routes";

export const NotebooksEmptyState = () => {
  return (
    <WorkspaceEmptyState
      imageData={{
        src: ASSET_PATHS.EMPTY_STATE_WRITING,
        alt: "Cartoon character writing lines with giant pencil.",
        widthPx: 200,
        heightPx: 199,
      }}
      title="No notebooks yet"
      description="Start by creating a new one"
    >
      <LinkButton href={routes.notebookCreate()}>Get Started</LinkButton>
    </WorkspaceEmptyState>
  );
};
