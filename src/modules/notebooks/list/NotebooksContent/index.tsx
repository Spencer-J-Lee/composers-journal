"use client";

import { useEffect } from "react";
import clsx from "clsx";

import { LinkButton } from "@/components/buttons/LinkButton";
import { WorkspacePageWrapper } from "@/components/pageWrappers/WorkspacePageWrapper";
import { WORKSPACE_WRAPPER_PX } from "@/components/pageWrappers/WorkspacePageWrapper/styles";
import { ShimmerNotebookCard } from "@/components/shimmerLoaders/ShimmerNotebookCard";
import { ShimmerSimpleFilters } from "@/components/shimmerLoaders/ShimmerSimpleFilters";
import { StickyTopBar } from "@/components/StickyTopBar";
import { Typography } from "@/components/Typography";
import { routes } from "@/constants/routes";
import { useActiveNotebooks } from "@/hooks/cache/notebooks";
import { repeatRender } from "@/utils/client/repeatRender";
import { showErrorToast } from "@/utils/client/toasts";

import { SimpleFilters } from "../../../../components/SimpleFilters";
import { useSortedNotebooks } from "../../hooks/useSortedNotebooks";
import { NotebookCard } from "../NotebookCard";
import { NotebookControl } from "../NotebookCard/NotebookControls/types";
import { NotebooksEmptyState } from "../NotebooksEmptyState";

export const NotebooksContent = () => {
  const { data: notebooks, isPending, error } = useActiveNotebooks();
  const { sortBy, setSortBy, sortedNotebooks } = useSortedNotebooks(notebooks);
  const notebookControls: NotebookControl[] = ["edit", "trash"];

  useEffect(() => {
    if (error) {
      console.error(error);
      showErrorToast(error.message);
    }
  }, [error]);

  const renderContent = () => {
    if (isPending) {
      return (
        <WorkspacePageWrapper paddingSize="none">
          <StickyTopBar className="flex items-center justify-between">
            <ShimmerSimpleFilters />
            <LinkButton href={routes.notebookCreate()}>Create</LinkButton>
          </StickyTopBar>

          <div className={clsx("pb-4", WORKSPACE_WRAPPER_PX)}>
            <ul className="space-y-4">
              {repeatRender(3, (i) => (
                <li key={i}>
                  <ShimmerNotebookCard
                    controlsCount={notebookControls.length}
                  />
                </li>
              ))}
            </ul>
          </div>
        </WorkspacePageWrapper>
      );
    }

    let content = null;
    if (error) {
      content = (
        <Typography variant="smallMuted">Failed to load notebooks</Typography>
      );
    }

    if (notebooks && notebooks.length === 0) {
      return (
        <WorkspacePageWrapper>
          <NotebooksEmptyState />
        </WorkspacePageWrapper>
      );
    }

    content = (
      <ul className="space-y-4">
        {sortedNotebooks.map((notebook) => (
          <li key={notebook.name}>
            <NotebookCard notebook={notebook} controls={notebookControls} />
          </li>
        ))}
      </ul>
    );

    return (
      <WorkspacePageWrapper paddingSize="none">
        <StickyTopBar className="flex items-center justify-between">
          <SimpleFilters sortBy={sortBy} setSortBy={setSortBy} />
          <LinkButton href={routes.notebookCreate()}>Create</LinkButton>
        </StickyTopBar>

        <div className={clsx("pb-4", WORKSPACE_WRAPPER_PX)}>{content}</div>
      </WorkspacePageWrapper>
    );
  };

  return renderContent();
};
