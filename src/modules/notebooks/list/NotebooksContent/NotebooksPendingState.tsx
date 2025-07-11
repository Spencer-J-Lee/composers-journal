import { LinkButton } from "@/components/buttons/LinkButton";
import { CardResultsWrapper } from "@/components/CardResultsWrapper";
import { WorkspaceContentWrapper } from "@/components/contentWrappers/WorkspaceContentWrapper";
import { WorkspacePageWrapper } from "@/components/pageWrappers/WorkspacePageWrapper";
import { ShimmerNotebookCard } from "@/components/shimmerLoaders/ShimmerNotebookCard";
import { ShimmerSimpleFilters } from "@/components/shimmerLoaders/ShimmerSimpleFilters";
import { StickyTopBar } from "@/components/StickyTopBar";
import { routes } from "@/constants/routes";
import { repeatRender } from "@/utils/client/repeatRender";

import { NotebookControl } from "../NotebookCard/NotebookControls/types";

type NotebooksPendingStateProps = {
  notebookControls: NotebookControl[];
};

export const NotebooksPendingState = ({
  notebookControls,
}: NotebooksPendingStateProps) => {
  return (
    <WorkspacePageWrapper paddingSize="none">
      <StickyTopBar className="flex items-center justify-between">
        <ShimmerSimpleFilters />
        <LinkButton href={routes.notebookCreate()}>Create</LinkButton>
      </StickyTopBar>

      <WorkspaceContentWrapper>
        <CardResultsWrapper>
          {repeatRender(3, (i) => (
            <li key={i}>
              <ShimmerNotebookCard controlsCount={notebookControls.length} />
            </li>
          ))}
        </CardResultsWrapper>
      </WorkspaceContentWrapper>
    </WorkspacePageWrapper>
  );
};
