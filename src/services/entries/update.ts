import { ERROR_MESSAGES } from "@/constants/messages";
import { Entry } from "@/models/Entry";
import { STATUSES } from "@/models/types/status";
import { withFirstResult } from "@/utils/server/withFirstResults";

import { API_PATHS } from "../constants/apiPaths";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";

type apiUpdateEntriesProps = { ids: Entry["id"][] } & Partial<
  Pick<Entry, "title" | "description" | "status" | "notebookId">
>;

export const apiUpdateEntries = async (
  props: apiUpdateEntriesProps,
): Promise<Entry[]> => {
  return await fetchWithErrorHandling<Entry[]>(API_PATHS.ENTRIES.ROOT, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });
};

export const apiRestoreEntry = async (id: Entry["id"]): Promise<Entry> => {
  return withFirstResult(
    () =>
      apiUpdateEntries({
        ids: [id],
        status: STATUSES.ACTIVE,
      }),
    ERROR_MESSAGES.DEV.UPDATE.NO_ENTRY(id),
  );
};

export const apiTrashEntry = async (id: Entry["id"]): Promise<Entry> => {
  return withFirstResult(
    () =>
      apiUpdateEntries({
        ids: [id],
        status: STATUSES.TRASHED,
      }),
    ERROR_MESSAGES.DEV.UPDATE.NO_ENTRY(id),
  );
};

export const apiSoftDeleteEntry = async (id: Entry["id"]): Promise<Entry> => {
  return withFirstResult(
    () =>
      apiUpdateEntries({
        ids: [id],
        status: STATUSES.DELETED,
      }),
    ERROR_MESSAGES.DEV.UPDATE.NO_ENTRY(id),
  );
};

export const apiSoftDeleteEntries = async (
  ids: Entry["id"][],
): Promise<Entry[]> => {
  return apiUpdateEntries({
    ids,
    status: STATUSES.DELETED,
  });
};
