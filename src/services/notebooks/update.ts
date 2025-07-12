import { ERROR_MESSAGES } from "@/constants/messages";
import { Notebook } from "@/models/Notebook";
import { STATUSES } from "@/models/types/status";
import { withFirstResult } from "@/utils/server/withFirstResults";

import { API_PATHS } from "../constants/apiPaths";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";

type EditableProps = Partial<Pick<Notebook, "name" | "status">>;

export const apiUpdateNotebooks = async (
  props: { ids: Notebook["id"][] } & EditableProps,
): Promise<Notebook[]> => {
  return fetchWithErrorHandling<Notebook[]>(API_PATHS.NOTEBOOKS.ROOT, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });
};

export const apiUpdateNotebook = async ({
  id,
  ...rest
}: Pick<Notebook, "id"> & EditableProps): Promise<Notebook> => {
  return withFirstResult(
    () =>
      apiUpdateNotebooks({
        ids: [id],
        ...rest,
      }),
    ERROR_MESSAGES.DEV.UPDATE.NO_NOTEBOOK(id),
  );
};

export const apiRestoreNotebook = async (
  id: Notebook["id"],
): Promise<Notebook> => {
  return withFirstResult(
    () =>
      apiUpdateNotebooks({
        ids: [id],
        status: STATUSES.ACTIVE,
      }),
    ERROR_MESSAGES.DEV.UPDATE.NO_NOTEBOOK(id),
  );
};

export const apiTrashNotebook = async (
  id: Notebook["id"],
): Promise<Notebook> => {
  return withFirstResult(
    () =>
      apiUpdateNotebooks({
        ids: [id],
        status: STATUSES.TRASHED,
      }),
    ERROR_MESSAGES.DEV.UPDATE.NO_NOTEBOOK(id),
  );
};

export const apiSoftDeleteNotebook = async (
  id: Notebook["id"],
): Promise<Notebook> => {
  return withFirstResult(
    () =>
      apiUpdateNotebooks({
        ids: [id],
        status: STATUSES.DELETED,
      }),
    ERROR_MESSAGES.DEV.UPDATE.NO_NOTEBOOK(id),
  );
};

// TODO: create mutation hook and hook up to delete trash button
export const apiSoftDeleteNotebooks = async (
  ids: Notebook["id"][],
): Promise<Notebook[]> => {
  return apiUpdateNotebooks({
    ids,
    status: STATUSES.DELETED,
  });
};
