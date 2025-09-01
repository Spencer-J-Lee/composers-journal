import { Notebook } from "@/models/Notebook";

import { API_PATHS } from "../constants/apiPaths";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";

type ApiDeleteNotebooksProps = {
  ids: Notebook["id"][];
};

export const apiDeleteNotebooks = (
  props: ApiDeleteNotebooksProps,
): Promise<Notebook> => {
  return fetchWithErrorHandling<Notebook>(API_PATHS.NOTEBOOKS.ROOT, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });
};
