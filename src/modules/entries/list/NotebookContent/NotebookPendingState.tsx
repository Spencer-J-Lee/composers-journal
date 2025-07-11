import { LinkButton } from "@/components/buttons/LinkButton";
import { CardResultsWrapper } from "@/components/CardResultsWrapper";
import { WorkspaceContentWrapper } from "@/components/contentWrappers/WorkspaceContentWrapper";
import { WorkspacePageWrapper } from "@/components/pageWrappers/WorkspacePageWrapper";
import { ShimmerEntryCard } from "@/components/shimmerLoaders/ShimmerEntryCard";
import { ShimmerSimpleFilters } from "@/components/shimmerLoaders/ShimmerSimpleFilters";
import { StickyTopBar } from "@/components/StickyTopBar";
import { routes } from "@/constants/routes";
import { Notebook } from "@/models/Notebook";
import { repeatRender } from "@/utils/client/repeatRender";

type NotebookPendingStateProps = {
  notebookId: Notebook["id"];
};

export const NotebookPendingState = ({
  notebookId,
}: NotebookPendingStateProps) => {
  return (
    <WorkspacePageWrapper paddingSize="none">
      <StickyTopBar className="flex items-center justify-between">
        <ShimmerSimpleFilters />
        <LinkButton href={routes.entryCreate(notebookId)}>Create</LinkButton>
      </StickyTopBar>

      <WorkspaceContentWrapper>
        <CardResultsWrapper>
          {repeatRender(3, (i) => (
            <li key={i}>
              <ShimmerEntryCard controlsCount={2} />
            </li>
          ))}
        </CardResultsWrapper>
      </WorkspaceContentWrapper>
    </WorkspacePageWrapper>
  );
};
