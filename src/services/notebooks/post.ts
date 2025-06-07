import { Notebook } from "@/models/Notebook";
import { Status } from "@/models/types";

import { API_PATHS } from "../constants/apiPaths";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";

type apiCreateNotebookProps = {
  name: string;
  status: Status;
};

// TODO: setup redux
export const apiCreateNotebook = async ({
  name,
  status,
}: apiCreateNotebookProps): Promise<Notebook> => {
  return await fetchWithErrorHandling<Notebook>(API_PATHS.NOTEBOOKS.ROOT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      status,
    }),
  });
};
