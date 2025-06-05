import { Entry } from "@/models/Entry";

import { API_PATHS } from "../constants/apiPaths";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";

export const apiGetEntries = async (): Promise<Entry[]> => {
  return await fetchWithErrorHandling<Entry[]>(API_PATHS.ENTRIES.ROOT);
};
