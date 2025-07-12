"use client";

import { LinkButton } from "@/components/buttons/LinkButton";
import { CardResultsWrapper } from "@/components/CardResultsWrapper";
import { WorkspaceContentWrapper } from "@/components/contentWrappers/WorkspaceContentWrapper";
import { WorkspacePageWrapper } from "@/components/pageWrappers/WorkspacePageWrapper";
import { StickyTopBar } from "@/components/StickyTopBar";
import { Typography } from "@/components/Typography";
import { routes } from "@/constants/routes";
import { useActiveNotebooks } from "@/hooks/cache/notebooks";
import { useLogError } from "@/hooks/useLogError";

import { NotebooksPendingState } from "./NotebooksPendingState";
import { SimpleFilters } from "../../../../components/SimpleFilters";
import { useSortedNotebooks } from "../../hooks/useSortedNotebooks";
import { NotebookCard } from "../NotebookCard";
import { NotebookControl } from "../NotebookCard/NotebookControls/types";
import { NotebooksEmptyState } from "../NotebooksEmptyState";

export const NotebooksContent = () => {
  const {
    data: notebooks,
    error,
    isPending,
    isError,
    isSuccess,
  } = useActiveNotebooks();
  const { sortBy, setSortBy, sortedNotebooks } = useSortedNotebooks(notebooks);
  const notebookControls: NotebookControl[] = ["edit", "trash"];

  useLogError(error);

  if (isPending) {
    return <NotebooksPendingState notebookControls={notebookControls} />;
  }

  if (isSuccess && notebooks.length === 0) {
    return <NotebooksEmptyState />;
  }

  return (
    <WorkspacePageWrapper paddingSize="none">
      <StickyTopBar className="flex items-center justify-between">
        <SimpleFilters sortBy={sortBy} setSortBy={setSortBy} />
        <LinkButton href={routes.notebookCreate()}>Create</LinkButton>
      </StickyTopBar>

      <WorkspaceContentWrapper>
        {isError && (
          <Typography variant="smallMuted">Failed to load notebooks</Typography>
        )}

        {isSuccess && notebooks.length > 0 && (
          <CardResultsWrapper>
            {sortedNotebooks.map((notebook) => (
              <li key={notebook.name}>
                <NotebookCard notebook={notebook} controls={notebookControls} />
              </li>
            ))}
          </CardResultsWrapper>
        )}
      </WorkspaceContentWrapper>
    </WorkspacePageWrapper>
  );
};
