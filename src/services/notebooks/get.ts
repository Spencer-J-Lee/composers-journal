import { Notebook } from "@/models/Notebook";
import { STATUSES } from "@/models/types/status";

import { API_PATHS } from "../constants/apiPaths";
import { LimitOption } from "../types";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";
import { genUrlWithSearchParams } from "../utils/genUrlWithSearchParams";

export type apiGetNotebooksProps = Partial<
  Pick<Notebook, "id" | "name" | "status">
> &
  LimitOption;

export const apiGetNotebooks = async (
  props: apiGetNotebooksProps,
): Promise<Notebook[]> => {
  return await fetchWithErrorHandling<Notebook[]>(
    genUrlWithSearchParams(API_PATHS.NOTEBOOKS.ROOT, props),
  );
};

export const apiGetActiveNotebookById = async (id: Notebook["id"]) => {
  const res = await apiGetNotebooks({ id, status: STATUSES.ACTIVE });
  return res.length === 1 ? res[0] : null;
};

export const apiGetActiveNotebooks = async (): Promise<Notebook[]> => {
  return apiGetNotebooks({ status: STATUSES.ACTIVE });
};

export const apiGetTrashedNotebooks = async (): Promise<Notebook[]> => {
  return apiGetNotebooks({ status: STATUSES.TRASHED });
};
