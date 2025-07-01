"use client";

import { useMemo, useState } from "react";

import { useActiveNotebooks } from "@/hooks/cache/notebooks";

import { NotebooksFilters } from "./NotebooksFilters";
import { SortBy } from "./types";
import { NotebookCard } from "../NotebookCard";
import { NotebooksEmptyCTA } from "../NotebooksEmptyCTA";

export const NotebooksContent = () => {
  const { data: notebooks, isPending } = useActiveNotebooks();
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

  if (!notebooks) return <NotebooksEmptyCTA />;

  // TODO: handle loading UI
  if (isPending) return "Loading...";

  return (
    <>
      <NotebooksFilters sortBy={sortBy} setSortBy={setSortBy} />

      <div className="px-4 pb-4">
        <ul className="flex flex-col gap-4">
          {sortedNotebooks.map((notebook) => (
            <li key={notebook.name}>
              <NotebookCard notebook={notebook} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
