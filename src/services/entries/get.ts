import { RECENTLY_UPDATED_ENTRIES_PARAMS } from "@/constants/entryParams";
import { EntryMetrics } from "@/db/queries/entries/get/types";
import { entries } from "@/db/schema";
import { Entry } from "@/models/Entry";
import { STATUSES } from "@/models/types/status";
import { EntryFilter } from "@/modules/entries/list/EntriesFilter/types";
import { getPaginationParams } from "@/utils/getPaginationParams";
import { calcNextPage } from "@/utils/server/calcNextPage";

import { EntryPage } from "./types";
import { API_PATHS } from "../constants/apiPaths";
import { CommonApiOptions } from "../types";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";
import { genUrlWithSearchParams } from "../utils/genUrlWithSearchParams";

export type ApiGetEntriesProps = Partial<Pick<Entry, "notebookId" | "status">> &
  CommonApiOptions<typeof entries>;

export const apiGetEntries = async (
  props: ApiGetEntriesProps,
): Promise<Entry[]> => {
  return await fetchWithErrorHandling<Entry[]>(
    genUrlWithSearchParams(API_PATHS.ENTRIES.ROOT, props),
  );
};

export const apiGetTrashedEntries = async () => {
  return apiGetEntries({ status: STATUSES.TRASHED });
};

type ApiGetFilteredEntriesPageProps = {
  notebookId: Entry["notebookId"];
  filters: EntryFilter;
  page: number;
  limit: number;
  offset: number;
};

export const apiGetFilteredEntriesPage = async ({
  notebookId,
  page,
  filters,
  limit,
  offset,
}: ApiGetFilteredEntriesPageProps): Promise<EntryPage> => {
  const entries = await fetchWithErrorHandling<Entry[]>(
    genUrlWithSearchParams(API_PATHS.ENTRIES.ROOT, {
      notebookId,
      status: STATUSES.ACTIVE,
      orderBy: filters.orderBy,
      ...getPaginationParams(page, limit, offset),
    }),
  );

  return {
    entries,
    nextPage: calcNextPage(entries, page, limit),
  };
};

export const apiGetRecentlyUpdatedEntries = async () => {
  return apiGetEntries(RECENTLY_UPDATED_ENTRIES_PARAMS);
};

export const apiGetEntryMetrics = (): Promise<EntryMetrics> => {
  return fetchWithErrorHandling<EntryMetrics>(API_PATHS.ENTRIES.METRICS);
};
