"use client";

import clsx from "clsx";

import { LinkButton } from "@/components/buttons/LinkButton";
import { WORKSPACE_WRAPPER_PX } from "@/components/pageWrappers/WorkspacePageWrapper/styles";
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
      <div
        className={clsx(
          "bg-background-light sticky top-0 flex items-center justify-between gap-x-4 py-4",
          WORKSPACE_WRAPPER_PX,
        )}
      >
        <SimpleFilters sortBy={sortBy} setSortBy={setSortBy} />
        <LinkButton href={routes.notebookCreate()}>Create</LinkButton>
      </div>

      <div className={clsx("pb-4", WORKSPACE_WRAPPER_PX)}>
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
