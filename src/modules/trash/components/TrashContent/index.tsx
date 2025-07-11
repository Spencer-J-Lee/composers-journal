"use client";

import { Button } from "@/components/buttons/Button";
import { WorkspaceContentWrapper } from "@/components/contentWrappers/WorkspaceContentWrapper";
import { WorkspacePageWrapper } from "@/components/pageWrappers/WorkspacePageWrapper";
import { StickyTopBar } from "@/components/StickyTopBar";
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
    <WorkspacePageWrapper paddingSize="none">
      <StickyTopBar>
        {/* TODO: hook up Delete all functionality */}
        <Button variant="negative" className="ml-auto">
          Empty Trash
        </Button>
      </StickyTopBar>

      <WorkspaceContentWrapper>
        {isEmpty ? (
          <TrashEmptyState />
        ) : (
          <div className="flex flex-col gap-y-8">
            <NotebooksSection />
            <EntriesSection />
          </div>
        )}
      </WorkspaceContentWrapper>
    </WorkspacePageWrapper>
  );
};
