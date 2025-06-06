import { Notebook } from "@/models/Notebook";

import { API_PATHS } from "../constants/apiPaths";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";

export const apiGetNotebooks = async (): Promise<Notebook[]> => {
  return await fetchWithErrorHandling<Notebook[]>(API_PATHS.NOTEBOOKS.ROOT);
};
