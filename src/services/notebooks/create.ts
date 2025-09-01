import { Notebook } from "@/models/Notebook";
import { STATUSES } from "@/models/types/status";

import { API_PATHS } from "../constants/apiPaths";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";

type ApiCreateNotebookProps = Pick<Notebook, "name">;

export const apiCreateNotebook = (
  props: ApiCreateNotebookProps,
): Promise<Notebook> => {
  return fetchWithErrorHandling<Notebook>(API_PATHS.NOTEBOOKS.ROOT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...props,
      status: STATUSES.ACTIVE,
    }),
  });
};
