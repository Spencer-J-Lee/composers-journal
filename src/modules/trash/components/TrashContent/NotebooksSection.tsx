import { useEffect } from "react";

import { Button } from "@/components/buttons/Button";
import { CardResultsWrapper } from "@/components/CardResultsWrapper";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { ShimmerNotebookCard } from "@/components/shimmerLoaders/ShimmerNotebookCard";
import { ShimmerSimpleFilters } from "@/components/shimmerLoaders/ShimmerSimpleFilters";
import { SimpleFilters } from "@/components/SimpleFilters";
import { Typography } from "@/components/Typography";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants/messages";
import {
  useSoftDeleteNotebooks,
  useTrashedNotebooks,
} from "@/hooks/cache/notebooks";
import { Notebook } from "@/models/Notebook";
import { useSortedNotebooks } from "@/modules/notebooks/hooks/useSortedNotebooks";
import { NotebookCard } from "@/modules/notebooks/list/NotebookCard";
import { NotebookControl } from "@/modules/notebooks/list/NotebookCard/NotebookControls/types";
import { repeatRender } from "@/utils/client/repeatRender";
import { showErrorToast, showSuccessToast } from "@/utils/client/toasts";

export const NotebooksSection = () => {
  const {
    data: notebooks,
    error,
    isPending: isNotebooksPending,
    isError,
    isSuccess,
  } = useTrashedNotebooks();
  const { sortBy, setSortBy, sortedNotebooks } = useSortedNotebooks(notebooks);
  const { mutateAsync: softDeleteNotebooks, isPending: isSoftDeletePending } =
    useSoftDeleteNotebooks();
  const notebookControls: NotebookControl[] = ["restore", "delete"];

  useEffect(() => {
    if (error) {
      console.error(error);
      showErrorToast(error.message);
    }
  }, [error]);

  const handleSoftDeleteNotebooks = async (notebooks: Notebook[]) => {
    if (!confirm(`Delete notebooks?`)) {
      return;
    }

    try {
      await softDeleteNotebooks(notebooks.map((nb) => nb.id));
      showSuccessToast(SUCCESS_MESSAGES.USER.DELETE.NOTEBOOKS);
    } catch (err) {
      console.error(err);
      showErrorToast(ERROR_MESSAGES.USER.DELETE.NOTEBOOKS);
    }
  };

  return (
    <CollapsibleSection title="Notebooks">
      {isNotebooksPending && (
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
            <Button
              onClick={() => handleSoftDeleteNotebooks(notebooks)}
              loading={isSoftDeletePending}
              size="sm"
              variant="negative"
            >
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
