"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import debounce from "debounce";

import { LinkButton } from "@/components/buttons/LinkButton";
import { CardResultsWrapper } from "@/components/CardResultsWrapper";
import { WorkspaceContentWrapper } from "@/components/contentWrappers/WorkspaceContentWrapper";
import { InformativeDivider } from "@/components/InformativeDivider";
import { CircleLoader } from "@/components/loaders/CircleLoader";
import { WorkspacePageWrapper } from "@/components/pageWrappers/WorkspacePageWrapper";
import { StickyTopBar } from "@/components/StickyTopBar";
import { Typography } from "@/components/Typography";
import { routes } from "@/constants/routes";
import { DYNAMIC_TS_KEYS } from "@/constants/tanStackQueryKeys";
import { useInfEntryPages } from "@/hooks/cache/entries";
import { Notebook } from "@/models/Notebook";
import { EntryCard } from "@/modules/search/components/EntryCard";
import { showErrorToast } from "@/utils/client/toasts";

import { NotebookPendingState } from "./NotebookPendingState";
import { DEFAULT_ENTRY_FILTER } from "../EntriesFilter/constants";
import { EntryFilter } from "../EntriesFilter/types";
import { NotebookEmptyState } from "../NotebookEmptyState";

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
    isError,
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
    return <NotebookPendingState notebookId={notebookId} />;
  }

  if (isSuccess && data.pages.length === 0) {
    return <NotebookEmptyState notebookId={notebookId} />;
  }

  return (
    <WorkspacePageWrapper paddingSize="none" ref={containerRef}>
      <StickyTopBar className="flex items-center justify-between">
        <div>Filters placeholder</div>
        <LinkButton href={routes.entryCreate(notebookId)}>Create</LinkButton>
      </StickyTopBar>

      <WorkspaceContentWrapper>
        {isError && (
          <Typography variant="smallMuted">Failed to load entries</Typography>
        )}

        {isSuccess && data && (
          <CardResultsWrapper>
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
          </CardResultsWrapper>
        )}

        {!hasNextPage && (
          <InformativeDivider className="mt-4">
            No more entries to show
          </InformativeDivider>
        )}

        {isFetching && (
          <div className="my-5 flex items-center justify-center">
            <CircleLoader />
          </div>
        )}
      </WorkspaceContentWrapper>
    </WorkspacePageWrapper>
  );
};
