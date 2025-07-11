"use client";

import { useEffect } from "react";

import { CollapsibleSection } from "@/components/CollapsibleSection";
import { ShimmerEntryCard } from "@/components/shimmerLoaders/ShimmerEntryCard";
import { Typography } from "@/components/Typography";
import { STATIC_TS_KEYS } from "@/constants/tanStackQueryKeys";
import { useRecentlyUpdatedEntries } from "@/hooks/cache/entries";
import { EntryCard } from "@/modules/search/components/EntryCard";
import { showErrorToast } from "@/utils/client/toasts";
import { CardResultsWrapper } from "@/components/CardResultsWrapper";
import { EntryControl } from "@/modules/search/components/EntryCard/EntryControls/types";

export const RecentEntriesSection = () => {
  const {
    data: entries,
    error,
    isPending,
    isError,
    isSuccess,
  } = useRecentlyUpdatedEntries();
  const entryControls: EntryControl[] = ["edit"];

  useEffect(() => {
    if (error) {
      console.error(error);
      showErrorToast(error.message);
    }
  }, [error]);

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
