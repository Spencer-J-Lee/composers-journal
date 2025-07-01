import { Notebook } from "@/models/Notebook";
import { STATUSES } from "@/models/types/status";

import { API_PATHS } from "../constants/apiPaths";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";

type apiUpdateNotebookProps = Pick<Notebook, "id"> &
  Partial<Pick<Notebook, "name" | "status">>;

export const apiUpdateNotebook = async (
  props: apiUpdateNotebookProps,
): Promise<Notebook> => {
  return await fetchWithErrorHandling<Notebook>(API_PATHS.NOTEBOOKS.ROOT, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });
};

export const apiRestoreNotebook = async (
  id: Notebook["id"],
): Promise<Notebook> => {
  return apiUpdateNotebook({
    id,
    status: STATUSES.ACTIVE,
  });
};

export const apiTrashNotebook = async (
  id: Notebook["id"],
): Promise<Notebook> => {
  return apiUpdateNotebook({
    id,
    status: STATUSES.TRASHED,
  });
};

export const apiSoftDeleteNotebook = async (
  id: Notebook["id"],
): Promise<Notebook> => {
  return apiUpdateNotebook({
    id,
    status: STATUSES.DELETED,
  });
};
