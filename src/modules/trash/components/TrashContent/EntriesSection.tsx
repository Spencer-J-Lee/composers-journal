import { CollapsibleSection } from "@/components/CollapsibleSection";
import { SimpleFilters } from "@/components/SimpleFilters";
import { STATIC_TS_KEYS } from "@/constants/tanStackQueryKeys";
import { useTrashedEntries } from "@/hooks/cache/entries";
import { useSortedEntries } from "@/modules/entries/hooks/useSortedEntries";
import { EntryCard } from "@/modules/search/components/EntryCard";

export const EntriesSection = () => {
  const { data: entries } = useTrashedEntries();
  const { sortBy, setSortBy, sortedEntries } = useSortedEntries(entries);

  if (!entries?.length) {
    return null;
  }

  return (
    <CollapsibleSection title="Entries">
      <SimpleFilters sortBy={sortBy} setSortBy={setSortBy} className="mb-4" />

      <ul className="flex flex-col gap-4">
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
    </CollapsibleSection>
  );
};
