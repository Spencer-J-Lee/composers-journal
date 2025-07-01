"use client";

import { WorkspacePageWrapper } from "@/components/pageWrappers/WorkspacePageWrapper";
import { useTrashedEntries } from "@/hooks/cache/entries";
import { useTrashedNotebooks } from "@/hooks/cache/notebooks";

import { EntriesSection } from "./EntriesSection";
import { NotebooksSection } from "./NotebooksSection";
import { TrashEmptyState } from "../TrashEmptyState";

export const TrashContent = () => {
  const { data: notebooks } = useTrashedNotebooks();
  const { data: entries } = useTrashedEntries();

  if (!notebooks?.length && !entries?.length) {
    return <TrashEmptyState />;
  }

  return (
    <WorkspacePageWrapper>
      <div className="flex flex-col gap-y-5">
        <NotebooksSection />
        <EntriesSection />
      </div>
    </WorkspacePageWrapper>
  );
};
