"use client";

import { useActiveNotebooks } from "@/hooks/cache/notebooks";

import { SimpleFilters } from "../../../../components/SimpleFilters";
import { useSortedNotebooks } from "../../hooks/useSortedNotebooks";
import { NotebookCard } from "../NotebookCard";
import { NotebooksEmptyState } from "../NotebooksEmptyState";

export const NotebooksContent = () => {
  const { data: notebooks, isPending } = useActiveNotebooks();
  const { sortBy, setSortBy, sortedNotebooks } = useSortedNotebooks(notebooks);

  // TODO: handle loading UI
  if (isPending) return "Loading...";

  if (!notebooks) {
    return <NotebooksEmptyState />;
  }

  return (
    <>
      <div className="bg-background-light sticky top-0 p-4">
        <SimpleFilters sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      <div className="px-4 pb-4">
        <ul className="flex flex-col gap-4">
          {sortedNotebooks.map((notebook) => (
            <li key={notebook.name}>
              <NotebookCard notebook={notebook} controls={["edit", "trash"]} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
