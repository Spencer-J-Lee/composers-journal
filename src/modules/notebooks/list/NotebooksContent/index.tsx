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
import { Notebook } from "@/models/Notebook";

import { NOTEBOOKS_SORT_OPTIONS } from "./constants";
import { NotebooksPendingState } from "./NotebooksPendingState";
import { SimpleFilters } from "../../../../components/SimpleFilters";
import { useSorted } from "../../../../hooks/useSorted";
import { NotebookCard } from "../NotebookCard";
import { NotebookControl } from "../NotebookCard/NotebookControls/types";
import { NotebooksEmptyState } from "../NotebooksEmptyState";

export const NotebooksContent = () => {
  const {
    data: notebooks = [],
    error,
    isPending,
    isError,
    isSuccess,
  } = useActiveNotebooks();
  const {
    sortBy,
    setSortBy,
    sorted: sortedNotebooks,
  } = useSorted<Notebook>(notebooks, NOTEBOOKS_SORT_OPTIONS[0]);
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
        <SimpleFilters
          sortBy={sortBy}
          setSortBy={setSortBy}
          options={NOTEBOOKS_SORT_OPTIONS}
        />
        {/* TODO: [med] implement re-order feature for notebooks */}
        <LinkButton href={routes.notebookCreate()}>Create</LinkButton>
      </StickyTopBar>

      <WorkspaceContentWrapper>
        {isError && (
          <Typography variant="fallback">Failed to load notebooks</Typography>
        )}

        {isSuccess && notebooks.length > 0 && (
          <CardResultsWrapper>
            {sortedNotebooks.map((notebook) => (
              <li key={notebook.id}>
                <NotebookCard
                  notebook={notebook}
                  controls={notebookControls}
                  datesToDisplay={{
                    createdAt: true,
                  }}
                />
              </li>
            ))}
          </CardResultsWrapper>
        )}
      </WorkspaceContentWrapper>
    </WorkspacePageWrapper>
  );
};
