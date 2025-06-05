import { Collection } from "@/models/Collection";

import { API_PATHS } from "../constants/apiPaths";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";

export const apiGetCollections = async (): Promise<Collection[]> => {
  return await fetchWithErrorHandling<Collection[]>(API_PATHS.COLLECTIONS.ROOT);
};
