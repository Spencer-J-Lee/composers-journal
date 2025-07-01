import { useState } from "react";
import { faChevronDown,faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Collapsible } from "@/components/Collapsible";
import { SimpleFilters } from "@/components/SimpleFilters";
import { Typography } from "@/components/Typography";
import { useTrashedEntries } from "@/hooks/cache/entries";
import { useSortedEntries } from "@/modules/entries/hooks/useSortedEntries";
import { EntryCard } from "@/modules/search/components/EntryCard";

export const EntriesSection = () => {
  const { data: entries } = useTrashedEntries();
  const { sortBy, setSortBy, sortedEntries } = useSortedEntries(entries);
  const [show, setShow] = useState(true);

  if (!entries?.length) {
    return null;
  }

  return (
    <section>
      <button
        className="mb-2 flex w-full items-center gap-x-3 rounded text-left"
        onClick={() => setShow((prev) => !prev)}
      >
        <Typography variant="h2">Entries</Typography>
        <FontAwesomeIcon icon={show ? faChevronUp : faChevronDown} />
      </button>

      <Collapsible show={show}>
        <SimpleFilters sortBy={sortBy} setSortBy={setSortBy} className="mb-4" />

        <ul className="flex flex-col gap-4">
          {sortedEntries.map((entry) => (
            <li key={entry.id}>
              <EntryCard entry={entry} controls={["restore", "delete"]} />
            </li>
          ))}
        </ul>
      </Collapsible>
    </section>
  );
};
