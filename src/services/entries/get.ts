import { API_PATHS } from "../constants/apiPaths";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";

export const apiGetEntries = async () => {
  return await fetchWithErrorHandling(API_PATHS.ENTRIES.ROOT);
};
