"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import debounce from "debounce";

import { InformativeDivider } from "@/components/InformativeDivider";
import { WorkspacePageWrapper } from "@/components/pageWrappers/WorkspacePageWrapper";
import { useInfEntryPages } from "@/hooks/cache/entries";
import { Notebook } from "@/models/Notebook";
import { EntryCard } from "@/modules/search/components/EntryCard";

import { DEFAULT_ENTRY_FILTER } from "./EntriesFilter/constants";
import { EntryFilter } from "./EntriesFilter/types";
import { NotebookEmptyState } from "./NotebookEmptyState";

type NotebookContentProps = {
  notebookId: Notebook["id"];
};

export const NotebookContent = ({ notebookId }: NotebookContentProps) => {
  const [filters, setFilters] = useState<EntryFilter>(DEFAULT_ENTRY_FILTER);
  const containerRef = useRef<HTMLElement | null>(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfEntryPages(notebookId, filters);
  const isFetchingNextPageRef = useRef(isFetchingNextPage);
  const hasNextPageRef = useRef(hasNextPage);
  isFetchingNextPageRef.current = isFetchingNextPage;
  hasNextPageRef.current = hasNextPage;

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const handleFetchTrigger = debounce(() => {
      const triggerPoint = container.scrollHeight - window.innerHeight * 4;

      if (
        !isFetchingNextPageRef.current &&
        hasNextPageRef.current &&
        container.scrollTop >= triggerPoint
      ) {
        fetchNextPage();
      }
    }, 50);

    container.addEventListener("scroll", handleFetchTrigger);
    return () => container.removeEventListener("scroll", handleFetchTrigger);
  }, [fetchNextPage]);

  // TODO: handle loading UI and error
  if (status === "pending") return "Loading...";

  // TODO: check if any entries exist for this notebook before showing empty
  if (!data?.pages.length) {
    return <NotebookEmptyState notebookId={notebookId} />;
  }

  return (
    <WorkspacePageWrapper paddingSize="none" ref={containerRef}>
      <div className="p-4">
        <ul className="space-y-4">
          {data.pages.map(({ entries }, i) => (
            <Fragment key={i}>
              {entries.map((entry) => (
                <li key={entry.id}>
                  <EntryCard
                    entry={entry}
                    controls={["edit", "save", "unsave", "trash"]}
                  />
                </li>
              ))}
            </Fragment>
          ))}
        </ul>

        {!hasNextPage && (
          <InformativeDivider className="mt-4">
            No more entries to show
          </InformativeDivider>
        )}

        {/* TODO: handle loading UI */}
        <div>{isFetching ? "Fetching..." : null}</div>
      </div>
    </WorkspacePageWrapper>
  );
};
