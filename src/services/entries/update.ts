import { Entry } from "@/models/Entry";
import { STATUSES } from "@/models/types/status";

import { API_PATHS } from "../constants/apiPaths";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";

type apiUpdateEntryProps = Pick<Entry, "id"> &
  Partial<Pick<Entry, "title" | "description" | "status" | "notebookId">>;

export const apiUpdateEntry = async (
  props: apiUpdateEntryProps,
): Promise<Entry> => {
  return await fetchWithErrorHandling<Entry>(API_PATHS.ENTRIES.ROOT, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });
};

export const apiRestoreEntry = async (id: Entry["id"]): Promise<Entry> => {
  return apiUpdateEntry({
    id,
    status: STATUSES.ACTIVE,
  });
};

export const apiTrashEntry = async (id: Entry["id"]): Promise<Entry> => {
  return apiUpdateEntry({
    id,
    status: STATUSES.TRASHED,
  });
};

export const apiSoftDeleteEntry = async (id: Entry["id"]): Promise<Entry> => {
  return apiUpdateEntry({
    id,
    status: STATUSES.DELETED,
  });
};
