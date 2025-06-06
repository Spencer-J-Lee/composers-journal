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
}: apiCreateNotebookProps) => {
  return await fetchWithErrorHandling(API_PATHS.COLLECTIONS.ROOT, {
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
