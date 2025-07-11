import { useEffect } from "react";

import { CardResultsWrapper } from "@/components/CardResultsWrapper";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { ShimmerEntryCard } from "@/components/shimmerLoaders/ShimmerEntryCard";
import { ShimmerSimpleFilters } from "@/components/shimmerLoaders/ShimmerSimpleFilters";
import { SimpleFilters } from "@/components/SimpleFilters";
import { Typography } from "@/components/Typography";
import { STATIC_TS_KEYS } from "@/constants/tanStackQueryKeys";
import { useTrashedEntries } from "@/hooks/cache/entries";
import { useSortedEntries } from "@/modules/entries/hooks/useSortedEntries";
import { EntryCard } from "@/modules/search/components/EntryCard";
import { EntryControl } from "@/modules/search/components/EntryCard/EntryControls/types";
import { repeatRender } from "@/utils/client/repeatRender";
import { showErrorToast } from "@/utils/client/toasts";

export const EntriesSection = () => {
  const {
    data: entries,
    error,
    isPending,
    isError,
    isSuccess,
  } = useTrashedEntries();
  const { sortBy, setSortBy, sortedEntries } = useSortedEntries(entries);
  const entryControls: EntryControl[] = ["restore", "delete"];

  useEffect(() => {
    if (error) {
      console.error(error);
      showErrorToast(error.message);
    }
  }, [error]);

  return (
    <CollapsibleSection title="Entries">
      {isPending && (
        <>
          <ShimmerSimpleFilters className="mb-4" />
          <CardResultsWrapper>
            {repeatRender(3, (i) => (
              <li key={i}>
                <ShimmerEntryCard controlsCount={entryControls.length} />
              </li>
            ))}
          </CardResultsWrapper>
        </>
      )}

      {isError && (
        <Typography variant="smallMuted">
          Failed to load trashed entries
        </Typography>
      )}

      {isSuccess && entries.length === 0 && (
        <Typography variant="smallMuted">No trashed entries</Typography>
      )}

      {isSuccess && entries.length > 0 && (
        <>
          <SimpleFilters
            sortBy={sortBy}
            setSortBy={setSortBy}
            className="mb-4"
          />
          <CardResultsWrapper>
            {sortedEntries.map((entry) => (
              <li key={entry.id}>
                <EntryCard
                  entry={entry}
                  controls={entryControls}
                  queryKey={STATIC_TS_KEYS.TRASHED_ENTRIES}
                />
              </li>
            ))}
          </CardResultsWrapper>
        </>
      )}
    </CollapsibleSection>
  );
};
