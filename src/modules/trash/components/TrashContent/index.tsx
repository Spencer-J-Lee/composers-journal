"use client";

import { useTrashedEntries } from "@/hooks/cache/entries";
import { useTrashedNotebooks } from "@/hooks/cache/notebooks";

import { TrashEmptyState } from "./TrashEmptyState";
import { TrashSuccessState } from "./TrashSuccessState";

export const TrashContent = () => {
  const { data: notebooks, isSuccess: isNotebooksSuccess } =
    useTrashedNotebooks();
  const { data: entries, isSuccess: isEntriesSuccess } = useTrashedEntries();

  const isEmpty =
    isNotebooksSuccess &&
    isEntriesSuccess &&
    notebooks.length === 0 &&
    entries.length === 0;

  if (isEmpty) {
    return <TrashEmptyState />;
  }

  return (
    <TrashSuccessState notebooks={notebooks ?? []} entries={entries ?? []} />
  );
};
