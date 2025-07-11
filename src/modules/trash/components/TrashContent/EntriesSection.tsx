import { useEffect } from "react";

import { CollapsibleSection } from "@/components/CollapsibleSection";
import { ShimmerEntryCard } from "@/components/shimmerLoaders/ShimmerEntryCard";
import { ShimmerSimpleFilters } from "@/components/shimmerLoaders/ShimmerSimpleFilters";
import { SimpleFilters } from "@/components/SimpleFilters";
import { Typography } from "@/components/Typography";
import { STATIC_TS_KEYS } from "@/constants/tanStackQueryKeys";
import { useTrashedEntries } from "@/hooks/cache/entries";
import { useSortedEntries } from "@/modules/entries/hooks/useSortedEntries";
import { EntryCard } from "@/modules/search/components/EntryCard";
import { repeatRender } from "@/utils/client/repeatRender";
import { showErrorToast } from "@/utils/client/toasts";

export const EntriesSection = () => {
  const { data: entries, isPending, error } = useTrashedEntries();
  const { sortBy, setSortBy, sortedEntries } = useSortedEntries(entries);

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
                <ShimmerEntryCard controlsCount={2} />
              </li>
            ))}
          </ul>
        </>
      );
    }

    if (error) {
      return (
        <Typography variant="smallMuted">
          Failed to load trashed entries
        </Typography>
      );
    }

    if (entries.length === 0) {
      return <Typography variant="smallMuted">No trashed entries</Typography>;
    }

    return (
      <>
        <SimpleFilters sortBy={sortBy} setSortBy={setSortBy} className="mb-4" />

        <ul className="space-y-4">
          {sortedEntries.map((entry) => (
            <li key={entry.id}>
              <EntryCard
                entry={entry}
                controls={["restore", "delete"]}
                queryKey={STATIC_TS_KEYS.TRASHED_ENTRIES}
              />
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <CollapsibleSection title="Entries">{renderContent()}</CollapsibleSection>
  );
};
