"use client";

import { CardResultsWrapper } from "@/components/CardResultsWrapper";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { ShimmerEntryCard } from "@/components/shimmerLoaders/ShimmerEntryCard";
import { Typography } from "@/components/Typography";
import { STATIC_TS_KEYS } from "@/constants/tanStackQueryKeys";
import { useRecentlyUpdatedEntries } from "@/hooks/cache/entries";
import { useLogError } from "@/hooks/useLogError";
import { EntryCard } from "@/modules/entries/components/EntryCard";
import { EntryControl } from "@/modules/entries/components/EntryCard/EntryControls/types";

export const RecentEntriesSection = () => {
  const {
    data: entries,
    error,
    isPending,
    isError,
    isSuccess,
  } = useRecentlyUpdatedEntries();
  const entryControls: EntryControl[] = ["edit", "saving"];

  useLogError(error);

  return (
    <CollapsibleSection title="Recent entries">
      {isPending && (
        <CardResultsWrapper>
          <li>
            <ShimmerEntryCard controlsCount={entryControls.length} />
          </li>
        </CardResultsWrapper>
      )}

      {isError && (
        <Typography variant="smallMuted">
          Failed to load recent entries
        </Typography>
      )}

      {isSuccess && entries.length === 0 && (
        <Typography variant="smallMuted">No recent entries</Typography>
      )}

      {isSuccess && entries.length > 0 && (
        <CardResultsWrapper>
          {entries.map((entry) => (
            <li key={entry.id}>
              <EntryCard
                entry={entry}
                controls={entryControls}
                queryKey={STATIC_TS_KEYS.RECENTLY_UPDATED_ENTRIES}
              />
            </li>
          ))}
        </CardResultsWrapper>
      )}
    </CollapsibleSection>
  );
};
