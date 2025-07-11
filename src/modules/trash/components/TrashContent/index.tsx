"use client";

import { WorkspacePageWrapper } from "@/components/pageWrappers/WorkspacePageWrapper";
import { useTrashedEntries } from "@/hooks/cache/entries";
import { useTrashedNotebooks } from "@/hooks/cache/notebooks";

import { EntriesSection } from "./EntriesSection";
import { NotebooksSection } from "./NotebooksSection";
import { TrashEmptyState } from "../TrashEmptyState";

export const TrashContent = () => {
  const { data: notebooks, isSuccess: isNotebooksSuccess } =
    useTrashedNotebooks();
  const { data: entries, isSuccess: isEntriesSuccess } = useTrashedEntries();

  const isEmpty =
    isNotebooksSuccess &&
    isEntriesSuccess &&
    notebooks.length === 0 &&
    entries.length === 0;

  return (
    <WorkspacePageWrapper>
      {isEmpty ? (
        <TrashEmptyState />
      ) : (
        <div className="flex flex-col gap-y-8">
          <NotebooksSection />
          <EntriesSection />
        </div>
      )}
    </WorkspacePageWrapper>
  );
};
