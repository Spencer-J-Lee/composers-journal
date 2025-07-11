import { useEffect } from "react";

import { CollapsibleSection } from "@/components/CollapsibleSection";
import { ShimmerNotebookCard } from "@/components/shimmerLoaders/ShimmerNotebookCard";
import { ShimmerSimpleFilters } from "@/components/shimmerLoaders/ShimmerSimpleFilters";
import { SimpleFilters } from "@/components/SimpleFilters";
import { Typography } from "@/components/Typography";
import { useTrashedNotebooks } from "@/hooks/cache/notebooks";
import { useSortedNotebooks } from "@/modules/notebooks/hooks/useSortedNotebooks";
import { NotebookCard } from "@/modules/notebooks/list/NotebookCard";
import { repeatRender } from "@/utils/client/repeatRender";
import { showErrorToast } from "@/utils/client/toasts";

export const NotebooksSection = () => {
  const { data: notebooks, isPending, error } = useTrashedNotebooks();
  const { sortBy, setSortBy, sortedNotebooks } = useSortedNotebooks(notebooks);

  useEffect(() => {
    if (error) {
      console.error(error);
      showErrorToast(error.message);
    }
  }, [error]);

  const renderContent = () => {
    if (isPending) {
      return (
        <>
          <ShimmerSimpleFilters className="mb-4" />

          <ul className="space-y-4">
            {repeatRender(3, (i) => (
              <li key={i}>
                <ShimmerNotebookCard controlsCount={2} />
              </li>
            ))}
          </ul>
        </>
      );
    }

    if (error) {
      return (
        <Typography variant="smallMuted">
          Failed to load trashed notebooks
        </Typography>
      );
    }

    if (notebooks.length === 0) {
      return <Typography variant="smallMuted">No trashed notebooks</Typography>;
    }

    return (
      <>
        <SimpleFilters sortBy={sortBy} setSortBy={setSortBy} className="mb-4" />

        <ul className="space-y-4">
          {sortedNotebooks.map((notebook) => (
            <li key={notebook.id}>
              <NotebookCard
                notebook={notebook}
                controls={["restore", "delete"]}
              />
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <CollapsibleSection title="Notebooks">{renderContent()}</CollapsibleSection>
  );
};
