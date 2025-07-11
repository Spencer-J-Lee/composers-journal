"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import debounce from "debounce";

import { LinkButton } from "@/components/buttons/LinkButton";
import { InformativeDivider } from "@/components/InformativeDivider";
import { WorkspacePageWrapper } from "@/components/pageWrappers/WorkspacePageWrapper";
import { WORKSPACE_WRAPPER_PX } from "@/components/pageWrappers/WorkspacePageWrapper/styles";
import { ShimmerEntryCard } from "@/components/shimmerLoaders/ShimmerEntryCard";
import { ShimmerSimpleFilters } from "@/components/shimmerLoaders/ShimmerSimpleFilters";
import { StickyTopBar } from "@/components/StickyTopBar";
import { Typography } from "@/components/Typography";
import { routes } from "@/constants/routes";
import { DYNAMIC_TS_KEYS } from "@/constants/tanStackQueryKeys";
import { useInfEntryPages } from "@/hooks/cache/entries";
import { Notebook } from "@/models/Notebook";
import { EntryCard } from "@/modules/search/components/EntryCard";
import { repeatRender } from "@/utils/client/repeatRender";
import { showErrorToast } from "@/utils/client/toasts";

import { DEFAULT_ENTRY_FILTER } from "./EntriesFilter/constants";
import { EntryFilter } from "./EntriesFilter/types";
import { NotebookEmptyState } from "./NotebookEmptyState";

type NotebookContentProps = {
  notebookId: Notebook["id"];
};

export const NotebookContent = ({ notebookId }: NotebookContentProps) => {
  const [filters, setFilters] = useState<EntryFilter>(DEFAULT_ENTRY_FILTER);
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLElement | null>(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isPending,
    isSuccess,
  } = useInfEntryPages(notebookId, filters, offset);
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

  useEffect(() => {
    if (error) {
      console.error(error);
      showErrorToast(error.message);
    }
  }, [error]);

  const decrementOffset = () => {
    setOffset((prev) => prev - 1);
  };

  const handleFiltersChange = () => {
    setOffset(0);
    setFilters((prev) => prev);
  };

  if (isPending) {
    return (
      <WorkspacePageWrapper paddingSize="none">
        <StickyTopBar className="flex items-center justify-between">
          <ShimmerSimpleFilters />
          <LinkButton href={routes.entryCreate(notebookId)}>Create</LinkButton>
        </StickyTopBar>

        <div className={clsx("pb-4", WORKSPACE_WRAPPER_PX)}>
          <ul className="space-y-4">
            {repeatRender(3, (i) => (
              <li key={i}>
                <ShimmerEntryCard controlsCount={2} />
              </li>
            ))}
          </ul>
        </div>
      </WorkspacePageWrapper>
    );
  }

  if (isSuccess && data.pages.length === 0) {
    return (
      <WorkspacePageWrapper>
        <NotebookEmptyState notebookId={notebookId} />;
      </WorkspacePageWrapper>
    );
  }

  return (
    <WorkspacePageWrapper paddingSize="none" ref={containerRef}>
      <StickyTopBar className="flex items-center justify-between">
        {/* <SimpleFilters sortBy={sortBy} setSortBy={setSortBy} /> */}
        <div>Filters placeholder</div>
        <LinkButton href={routes.entryCreate(notebookId)}>Create</LinkButton>
      </StickyTopBar>

      <div className={clsx("pb-4", WORKSPACE_WRAPPER_PX)}>
        {error && (
          <Typography variant="smallMuted">Failed to load entries</Typography>
        )}

        {data && (
          <ul className="space-y-4">
            {data.pages.map(({ entries }, i) => (
              <Fragment key={i}>
                {entries.map((entry) => (
                  <li key={entry.id}>
                    <EntryCard
                      entry={entry}
                      controls={["edit", "saving", "trash"]}
                      queryKey={DYNAMIC_TS_KEYS.ENTRIES_BY_FILTERS(
                        entry.notebookId,
                        filters,
                      )}
                      onTrashSuccess={decrementOffset}
                    />
                  </li>
                ))}
              </Fragment>
            ))}
          </ul>
        )}

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
