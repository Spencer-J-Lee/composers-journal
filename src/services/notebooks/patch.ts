import { Notebook } from "@/models/Notebook";
import { STATUSES } from "@/models/types";

import { API_PATHS } from "../constants/apiPaths";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";

type apiUpdateNotebookProps = Pick<Notebook, "id"> &
  Partial<Pick<Notebook, "name" | "status">>;

// TODO: setup redux
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

// TODO: setup redux
export const apiTrashNotebook = async (
  props: Pick<Notebook, "id">,
): Promise<Notebook> => {
  return apiUpdateNotebook({
    ...props,
    status: STATUSES.TRASHED,
  });
};
