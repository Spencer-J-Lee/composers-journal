import { Notebook } from "@/models/Notebook";

import { API_PATHS } from "../constants/apiPaths";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";
import { genUrlWithSearchParams } from "../utils/genUrlWithSearchParams";

export type apiGetNotebooksProps = { limit?: number } & Partial<
  Pick<Notebook, "name" | "status">
>;

export const apiGetNotebooks = async (
  props: apiGetNotebooksProps,
): Promise<Notebook[]> => {
  return await fetchWithErrorHandling<Notebook[]>(
    genUrlWithSearchParams(API_PATHS.NOTEBOOKS.ROOT, props),
  );
};
