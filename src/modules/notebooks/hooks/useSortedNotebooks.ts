import { useMemo,useState } from "react";

import { SortBy } from "@/components/SimpleFilters/types";
import { Notebook } from "@/models/Notebook";

export const useSortedNotebooks = (notebooks: Notebook[] | undefined) => {
  const [sortBy, setSortBy] = useState<SortBy>("latest");

  const sortedNotebooks = useMemo(() => {
    if (!notebooks) return [];

    return notebooks.toSorted((a, b) => {
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
          return b.name.localeCompare(a.name);
        case "name desc":
          return a.name.localeCompare(b.name);
      }
    });
  }, [notebooks, sortBy]);

  return {
    sortBy,
    setSortBy,
    sortedNotebooks,
  };
};
