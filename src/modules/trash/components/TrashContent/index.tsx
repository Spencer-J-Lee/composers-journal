"use client";

import { WorkspacePageWrapper } from "@/components/pageWrappers/WorkspacePageWrapper";

import { EntriesSection } from "./EntriesSection";
import { NotebooksSection } from "./NotebooksSection";

export const TrashContent = () => {
  return (
    <WorkspacePageWrapper>
      <div className="flex flex-col gap-y-5">
        <NotebooksSection />
        <EntriesSection />
      </div>
    </WorkspacePageWrapper>
  );
};
