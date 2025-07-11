import { Entry } from "@/models/Entry";

import { API_PATHS } from "../constants/apiPaths";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";

type apiCreateEntryProps = Pick<
  Entry,
  "notebookId" | "title" | "description" | "status"
>;

export const apiCreateEntry = async (
  props: apiCreateEntryProps,
): Promise<Entry> => {
  return await fetchWithErrorHandling<Entry>(API_PATHS.ENTRIES.ROOT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });
};
