import { ERROR_MESSAGES } from "@/constants/messages";
import { Notebook } from "@/models/Notebook";
import { STATUSES } from "@/models/types/status";
import { withFirstResult } from "@/utils/server/withFirstResults";

import { API_PATHS } from "../constants/apiPaths";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";

type EditableParams = Partial<Pick<Notebook, "name" | "status">>;

export const apiUpdateNotebooks = (
  props: { ids: Notebook["id"][] } & EditableParams,
): Promise<Notebook[]> => {
  return fetchWithErrorHandling<Notebook[]>(API_PATHS.NOTEBOOKS.ROOT, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });
};

export const apiUpdateNotebook = ({
  id,
  ...rest
}: Pick<Notebook, "id"> & EditableParams): Promise<Notebook> => {
  return withFirstResult(
    () =>
      apiUpdateNotebooks({
        ids: [id],
        ...rest,
      }),
    ERROR_MESSAGES.DEV.UPDATE.NO_NOTEBOOK(id),
  );
};

export const apiRestoreNotebook = (id: Notebook["id"]): Promise<Notebook> => {
  return withFirstResult(
    () =>
      apiUpdateNotebooks({
        ids: [id],
        status: STATUSES.ACTIVE,
      }),
    ERROR_MESSAGES.DEV.UPDATE.NO_NOTEBOOK(id),
  );
};

export const apiTrashNotebook = (id: Notebook["id"]): Promise<Notebook> => {
  return withFirstResult(
    () =>
      apiUpdateNotebooks({
        ids: [id],
        status: STATUSES.TRASHED,
      }),
    ERROR_MESSAGES.DEV.UPDATE.NO_NOTEBOOK(id),
  );
};

export const apiSoftDeleteNotebook = (
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

export const apiSoftDeleteNotebooks = (
  ids: Notebook["id"][],
): Promise<Notebook[]> => {
  return apiUpdateNotebooks({
    ids,
    status: STATUSES.DELETED,
  });
};
