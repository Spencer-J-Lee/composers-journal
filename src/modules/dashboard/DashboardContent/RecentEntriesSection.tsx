"use client";

import { useEffect } from "react";

import { CollapsibleSection } from "@/components/CollapsibleSection";
import { ShimmerEntryCard } from "@/components/shimmerLoaders/ShimmerEntryCard";
import { Typography } from "@/components/Typography";
import { STATIC_TS_KEYS } from "@/constants/tanStackQueryKeys";
import { useRecentlyUpdatedEntries } from "@/hooks/cache/entries";
import { EntryCard } from "@/modules/search/components/EntryCard";
import { showErrorToast } from "@/utils/client/toasts";

export const RecentEntriesSection = () => {
  const { data: entries, isPending, error } = useRecentlyUpdatedEntries();

  useEffect(() => {
    if (error) {
      console.error(error);
      showErrorToast(error.message);
    }
  }, [error]);

  const renderContent = () => {
    if (isPending) {
      return (
        <ul className="space-y-4">
          <li>
            <ShimmerEntryCard numControls={1} />
          </li>
        </ul>
      );
    }

    if (error) {
      return (
        <Typography variant="smallMuted">
          Failed to load recent entries.
        </Typography>
      );
    }

    if (entries.length === 0) {
      return <Typography variant="smallMuted">No recent entries</Typography>;
    }

    return (
      <ul className="space-y-4">
        {entries.map((entry) => (
          <li key={entry.id}>
            <EntryCard
              entry={entry}
              controls={["edit"]}
              queryKey={STATIC_TS_KEYS.RECENTLY_UPDATED_ENTRIES}
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <CollapsibleSection title="Recent entries">
      {renderContent()}
    </CollapsibleSection>
  );
};
