import { LinkButton } from "@/components/buttons/LinkButton";
import { ASSET_PATHS } from "@/constants/assetPaths";
import { routes } from "@/constants/routes";

import { EmptyState } from "../../../components/EmptyState";

export const NotebooksEmptyState = () => {
  return (
    <div className="flex min-h-full w-full items-center justify-center">
      <EmptyState
        imageData={{
          src: ASSET_PATHS.EMPTY_STATE_WRITING,
          alt: "Cartoon character writing lines with giant pencil.",
        }}
        title="No notebooks yet"
        description="Start by creating a new one"
      >
        <LinkButton href={routes.notebookCreate()}>Get Started</LinkButton>
      </EmptyState>
    </div>
  );
};
