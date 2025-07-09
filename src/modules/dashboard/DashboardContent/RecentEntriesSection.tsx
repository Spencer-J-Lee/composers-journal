"use client";

import { CollapsibleSection } from "@/components/CollapsibleSection";
import { STATIC_TS_KEYS } from "@/constants/tanStackQueryKeys";
import { useRecentlyUpdatedEntries } from "@/hooks/cache/entries";
import { EntryCard } from "@/modules/search/components/EntryCard";

export const RecentEntriesSection = () => {
  const { data: entries, status, error } = useRecentlyUpdatedEntries();

  // TODO: handle loading UI and error
  if (status === "pending") return "Loading...";
  if (error) {
    console.error(error);
  }

  if (!entries?.length) {
    return null;
  }

  return (
    <CollapsibleSection title="Recent entries" className="mt-4">
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
    </CollapsibleSection>
  );
};
