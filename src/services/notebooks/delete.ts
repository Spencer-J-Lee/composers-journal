import { Notebook } from "@/models/Notebook";

import { API_PATHS } from "../constants/apiPaths";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";

type apiDeleteNotebooksProps = {
  ids: Notebook["id"][];
};

export const apiDeleteNotebooks = async (
  props: apiDeleteNotebooksProps,
): Promise<Notebook> => {
  return await fetchWithErrorHandling<Notebook>(API_PATHS.NOTEBOOKS.ROOT, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });
};
