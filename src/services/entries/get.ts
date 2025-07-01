import { Entry } from "@/models/Entry";
import { STATUSES } from "@/models/types/status";

import { API_PATHS } from "../constants/apiPaths";
import { LimitOption } from "../types";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";
import { genUrlWithSearchParams } from "../utils/genUrlWithSearchParams";

export type apiGetEntriesProps = Partial<Pick<Entry, "notebookId" | "status">> &
  LimitOption;

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

export const apiGetActiveEntries = async () => {
  return apiGetEntries({ status: STATUSES.ACTIVE });
};

export const apiGetTrashedEntries = async () => {
  return apiGetEntries({ status: STATUSES.TRASHED });
};
