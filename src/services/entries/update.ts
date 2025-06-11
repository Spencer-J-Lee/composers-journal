import { Entry } from "@/models/Entry";
import { STATUSES } from "@/models/types/status";

import { API_PATHS } from "../constants/apiPaths";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";

type apiUpdateEntryProps = Pick<Entry, "id"> &
  Partial<Pick<Entry, "title" | "description" | "status" | "notebookId">>;

// TODO: setup redux
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

// TODO: setup redux
export const apiRestoreEntry = async (
  props: Pick<Entry, "id">,
): Promise<Entry> => {
  return apiUpdateEntry({
    ...props,
    status: STATUSES.ACTIVE,
  });
};

// TODO: setup redux
export const apiTrashEntry = async (
  props: Pick<Entry, "id">,
): Promise<Entry> => {
  return apiUpdateEntry({
    ...props,
    status: STATUSES.TRASHED,
  });
};

// TODO: setup redux
export const apiSoftDeleteEntry = async (
  props: Pick<Entry, "id">,
): Promise<Entry> => {
  return apiUpdateEntry({
    ...props,
    status: STATUSES.DELETED,
  });
};
