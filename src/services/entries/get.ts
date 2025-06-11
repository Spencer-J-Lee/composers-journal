import { Entry } from "@/models/Entry";
import { STATUSES } from "@/models/types";

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
};
