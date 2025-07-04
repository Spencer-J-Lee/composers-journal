import { getPaginationParams } from "@/getPaginationParams";
import { Entry } from "@/models/Entry";
import { STATUSES } from "@/models/types/status";
import { EntryFilter } from "@/modules/entries/list/EntriesFilter/types";
import { calcNextPage } from "@/utils/server/calcNextPage";

import { API_PATHS } from "../constants/apiPaths";
import { LimitOption, OffsetOption } from "../types";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";
import { genUrlWithSearchParams } from "../utils/genUrlWithSearchParams";

export type apiGetEntriesProps = Partial<Pick<Entry, "notebookId" | "status">> &
  LimitOption &
  OffsetOption;

export const apiGetEntries = async (
  props: apiGetEntriesProps,
): Promise<Entry[]> => {
  return await fetchWithErrorHandling<Entry[]>(
    genUrlWithSearchParams(API_PATHS.ENTRIES.ROOT, props),
  );
};

export const apiGetActiveEntriesForNotebook = async (
  props: Pick<Entry, "notebookId"> & LimitOption,
): Promise<Entry[]> => {
  return apiGetEntries({
    ...props,
    status: STATUSES.ACTIVE,
  });
};

// TODO: remove this
export const apiGetActiveEntries = async () => {
  return apiGetEntries({ status: STATUSES.ACTIVE });
};

export const apiGetTrashedEntries = async () => {
  return apiGetEntries({ status: STATUSES.TRASHED });
};

type apiGetFilteredEntriesPageProps = {
  notebookId: Entry["notebookId"];
  filters: EntryFilter;
  page: number;
  limit: number;
};

export const apiGetFilteredEntriesPage = async ({
  notebookId,
  page,
  filters,
  limit,
}: apiGetFilteredEntriesPageProps): Promise<{
  entries: Entry[];
  nextPage: number | null;
}> => {
  const entries = await fetchWithErrorHandling<Entry[]>(
    genUrlWithSearchParams(API_PATHS.ENTRIES.ROOT, {
      notebookId,
      status: STATUSES.ACTIVE,
      orderBy: filters.orderBy,
      ...getPaginationParams(page, limit),
    }),
  );

  return {
    entries,
    nextPage: calcNextPage(entries, page, limit),
  };
};
