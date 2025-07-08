import { entries } from "@/db/schema";
import { getPaginationParams } from "@/getPaginationParams";
import { Entry } from "@/models/Entry";
import { STATUSES } from "@/models/types/status";
import { EntryFilter } from "@/modules/entries/list/EntriesFilter/types";
import { calcNextPage } from "@/utils/server/calcNextPage";

import { EntryPage } from "./types";
import { API_PATHS } from "../constants/apiPaths";
import { CommonApiOptions } from "../types";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";
import { genUrlWithSearchParams } from "../utils/genUrlWithSearchParams";

export type apiGetEntriesProps = Partial<Pick<Entry, "notebookId" | "status">> &
  CommonApiOptions<typeof entries>;

export const apiGetEntries = async (
  props: apiGetEntriesProps,
): Promise<Entry[]> => {
  return await fetchWithErrorHandling<Entry[]>(
    genUrlWithSearchParams(API_PATHS.ENTRIES.ROOT, props),
  );
};

export const apiGetTrashedEntries = async () => {
  return apiGetEntries({ status: STATUSES.TRASHED });
};

type apiGetFilteredEntriesPageProps = {
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
}: apiGetFilteredEntriesPageProps): Promise<EntryPage> => {
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
