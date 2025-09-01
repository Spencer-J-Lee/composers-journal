import { Entry } from "@/models/Entry";

import { API_PATHS } from "../constants/apiPaths";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";

type ApiCreateEntryProps = Pick<
  Entry,
  "notebookId" | "title" | "description" | "status"
>;

export const apiCreateEntry = (props: ApiCreateEntryProps): Promise<Entry> => {
  return fetchWithErrorHandling<Entry>(API_PATHS.ENTRIES.ROOT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });
};
