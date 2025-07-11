import { useEffect } from "react";

import { Button } from "@/components/buttons/Button";
import { CardResultsWrapper } from "@/components/CardResultsWrapper";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { ShimmerNotebookCard } from "@/components/shimmerLoaders/ShimmerNotebookCard";
import { ShimmerSimpleFilters } from "@/components/shimmerLoaders/ShimmerSimpleFilters";
import { SimpleFilters } from "@/components/SimpleFilters";
import { Typography } from "@/components/Typography";
import { useTrashedNotebooks } from "@/hooks/cache/notebooks";
import { useSortedNotebooks } from "@/modules/notebooks/hooks/useSortedNotebooks";
import { NotebookCard } from "@/modules/notebooks/list/NotebookCard";
import { NotebookControl } from "@/modules/notebooks/list/NotebookCard/NotebookControls/types";
import { repeatRender } from "@/utils/client/repeatRender";
import { showErrorToast } from "@/utils/client/toasts";

export const NotebooksSection = () => {
  const {
    data: notebooks,
    error,
    isPending,
    isError,
    isSuccess,
  } = useTrashedNotebooks();
  const { sortBy, setSortBy, sortedNotebooks } = useSortedNotebooks(notebooks);
  const notebookControls: NotebookControl[] = ["restore", "delete"];

  useEffect(() => {
    if (error) {
      console.error(error);
      showErrorToast(error.message);
    }
  }, [error]);

  return (
    <CollapsibleSection title="Notebooks">
      {isPending && (
        <>
          <ShimmerSimpleFilters className="mb-4" />
          <CardResultsWrapper>
            {repeatRender(3, (i) => (
              <li key={i}>
                <ShimmerNotebookCard controlsCount={notebookControls.length} />
              </li>
            ))}
          </CardResultsWrapper>
        </>
      )}

      {isError && (
        <Typography variant="smallMuted">
          Failed to load trashed notebooks
        </Typography>
      )}

      {isSuccess && notebooks.length === 0 && (
        <Typography variant="smallMuted">No trashed notebooks</Typography>
      )}

      {isSuccess && notebooks.length > 0 && (
        <>
          <div className="mb-4 flex items-center justify-between gap-x-10">
            <SimpleFilters sortBy={sortBy} setSortBy={setSortBy} />
            {/* TODO: hook up Delete all functionality */}
            <Button size="sm" variant="negative">
              Delete all
            </Button>
          </div>
          <CardResultsWrapper>
            {sortedNotebooks.map((notebook) => (
              <li key={notebook.id}>
                <NotebookCard notebook={notebook} controls={notebookControls} />
              </li>
            ))}
          </CardResultsWrapper>
        </>
      )}
    </CollapsibleSection>
  );
};
