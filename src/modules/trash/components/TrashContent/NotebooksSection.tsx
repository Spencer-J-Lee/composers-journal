import { Button } from "@/components/buttons/Button";
import { CardResultsWrapper } from "@/components/CardResultsWrapper";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { commonAlertActions } from "@/components/dialogs/AlertDialog/constants";
import { ShimmerNotebookCard } from "@/components/shimmerLoaders/ShimmerNotebookCard";
import { ShimmerSimpleFilters } from "@/components/shimmerLoaders/ShimmerSimpleFilters";
import { SimpleFilters } from "@/components/SimpleFilters";
import { Typography } from "@/components/Typography";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants/messages";
import {
  useSoftDeleteNotebooks,
  useTrashedNotebooks,
} from "@/hooks/cache/notebooks";
import { useAlert } from "@/hooks/useAlert";
import { useLogError } from "@/hooks/useLogError";
import { Notebook } from "@/models/Notebook";
import { useSortedNotebooks } from "@/modules/notebooks/hooks/useSortedNotebooks";
import { NotebookCard } from "@/modules/notebooks/list/NotebookCard";
import { NotebookControl } from "@/modules/notebooks/list/NotebookCard/NotebookControls/types";
import { repeatRender } from "@/utils/client/repeatRender";

export const NotebooksSection = () => {
  const { openAlert } = useAlert();
  const {
    data: notebooks,
    error: notebooksError,
    isPending: isNotebooksPending,
    isError,
    isSuccess,
  } = useTrashedNotebooks();
  const { mutateAsync: softDeleteNotebooks, isPending: isSoftDeletePending } =
    useSoftDeleteNotebooks();
  const { sortBy, setSortBy, sortedNotebooks } = useSortedNotebooks(notebooks);
  const notebookControls: NotebookControl[] = ["restore", "delete"];

  useLogError(notebooksError);

  const handleSoftDeleteNotebooks = async (notebooks: Notebook[]) => {
    openAlert({
      title: "Are you sure?",
      description:
        "This will permanently delete all trashed notebooks and cannot be undone.",
      actions: [
        commonAlertActions.cancel,
        {
          type: "async",
          key: "confirm",
          text: "Confirm",
          variant: "negative",
          onConfirm: () => softDeleteNotebooks(notebooks.map((nb) => nb.id)),
          successMsg: SUCCESS_MESSAGES.USER.DELETE.NOTEBOOKS,
          errMsg: ERROR_MESSAGES.USER.DELETE.NOTEBOOKS,
        },
      ],
    });
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
        <Typography variant="fallback">
          Failed to load trashed notebooks
        </Typography>
      )}

      {isSuccess && notebooks.length === 0 && (
        <Typography variant="emptyState">No trashed notebooks</Typography>
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
