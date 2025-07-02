import { Notebook } from "@/models/Notebook";
import { STATUSES } from "@/models/types/status";

import { API_PATHS } from "../constants/apiPaths";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";

type apiCreateNotebookProps = Pick<Notebook, "name">;

export const apiCreateNotebook = async (
  props: apiCreateNotebookProps,
): Promise<Notebook> => {
  return await fetchWithErrorHandling<Notebook>(API_PATHS.NOTEBOOKS.ROOT, {
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
