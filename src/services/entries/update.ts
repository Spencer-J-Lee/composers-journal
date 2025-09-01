import { ERROR_MESSAGES } from "@/constants/messages";
import { Entry } from "@/models/Entry";
import { STATUSES } from "@/models/types/status";
import { withFirstResult } from "@/utils/server/withFirstResults";

import { API_PATHS } from "../constants/apiPaths";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";

type EditableParams = Partial<
  Pick<Entry, "title" | "description" | "status" | "notebookId">
>;

type ApiUpdateEntriesProps = { ids: Entry["id"][] } & EditableParams;

export const apiUpdateEntries = (
  props: ApiUpdateEntriesProps,
): Promise<Entry[]> => {
  return fetchWithErrorHandling<Entry[]>(API_PATHS.ENTRIES.ROOT, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });
};

export const apiUpdateEntry = (
  id: Entry["id"],
  params: EditableParams,
): Promise<Entry> => {
  return withFirstResult(
    () =>
      apiUpdateEntries({
        ids: [id],
        ...params,
      }),
    ERROR_MESSAGES.DEV.UPDATE.NO_ENTRY(id),
  );
};

export const apiRestoreEntry = (id: Entry["id"]): Promise<Entry> => {
  return withFirstResult(
    () =>
      apiUpdateEntries({
        ids: [id],
        status: STATUSES.ACTIVE,
      }),
    ERROR_MESSAGES.DEV.UPDATE.NO_ENTRY(id),
  );
};

export const apiTrashEntry = (id: Entry["id"]): Promise<Entry> => {
  return withFirstResult(
    () =>
      apiUpdateEntries({
        ids: [id],
        status: STATUSES.TRASHED,
      }),
    ERROR_MESSAGES.DEV.UPDATE.NO_ENTRY(id),
  );
};

export const apiSoftDeleteEntry = (id: Entry["id"]): Promise<Entry> => {
  return withFirstResult(
    () =>
      apiUpdateEntries({
        ids: [id],
        status: STATUSES.DELETED,
      }),
    ERROR_MESSAGES.DEV.UPDATE.NO_ENTRY(id),
  );
};

export const apiSoftDeleteEntries = (ids: Entry["id"][]): Promise<Entry[]> => {
  return apiUpdateEntries({
    ids,
    status: STATUSES.DELETED,
  });
};
