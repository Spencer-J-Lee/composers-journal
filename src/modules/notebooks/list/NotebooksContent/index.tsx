"use client";

import { LinkButton } from "@/components/buttons/LinkButton";
import { routes } from "@/constants/routes";
import { useActiveNotebooks } from "@/hooks/cache/notebooks";

import { SimpleFilters } from "../../../../components/SimpleFilters";
import { useSortedNotebooks } from "../../hooks/useSortedNotebooks";
import { NotebookCard } from "../NotebookCard";
import { NotebooksEmptyState } from "../NotebooksEmptyState";

export const NotebooksContent = () => {
  const { data: notebooks, isPending } = useActiveNotebooks();
  const { sortBy, setSortBy, sortedNotebooks } = useSortedNotebooks(notebooks);

  // TODO: handle loading UI and error
  if (isPending) return "Loading...";

  if (!notebooks) {
    return <NotebooksEmptyState />;
  }

  return (
    <>
      <div className="bg-background-light sticky top-0 flex items-center justify-between gap-x-4 p-4">
        <SimpleFilters sortBy={sortBy} setSortBy={setSortBy} />
        <LinkButton href={routes.notebookCreate()}>Create</LinkButton>
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
