import { useMemo, useState } from "react";

import { SortBy } from "@/components/SimpleFilters/types";
import { Entry } from "@/models/Entry";

export const useSortedEntries = (entries: Entry[] | undefined) => {
  const [sortBy, setSortBy] = useState<SortBy>("latest");

  const sortedEntries = useMemo(() => {
    if (!entries) return [];

    return entries.toSorted((a, b) => {
      switch (sortBy) {
        case "latest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "name asc":
          return b.title.localeCompare(a.title);
        case "name desc":
          return a.title.localeCompare(b.title);
      }
    });
  }, [entries, sortBy]);

  return {
    sortBy,
    setSortBy,
    sortedEntries,
  };
};
