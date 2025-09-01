import { NotebookMetrics } from "@/db/queries/notebooks/get/types";
import { notebooks } from "@/db/schema";
import { Notebook } from "@/models/Notebook";
import { STATUSES } from "@/models/types/status";

import { API_PATHS } from "../constants/apiPaths";
import { CommonApiOptions } from "../types";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";
import { genUrlWithSearchParams } from "../utils/genUrlWithSearchParams";

export type ApiGetNotebooksProps = Partial<
  Pick<Notebook, "id" | "name" | "status">
> &
  CommonApiOptions<typeof notebooks>;

export const apiGetNotebooks = (
  props: ApiGetNotebooksProps,
): Promise<Notebook[]> => {
  return fetchWithErrorHandling<Notebook[]>(
    genUrlWithSearchParams(API_PATHS.NOTEBOOKS.ROOT, props),
  );
};

export const apiGetActiveNotebooks = (): Promise<Notebook[]> => {
  return apiGetNotebooks({ status: STATUSES.ACTIVE });
};

export const apiGetTrashedNotebooks = (): Promise<Notebook[]> => {
  return apiGetNotebooks({ status: STATUSES.TRASHED });
};

export const apiGetNotebookMetrics = (): Promise<NotebookMetrics> => {
  return fetchWithErrorHandling<NotebookMetrics>(API_PATHS.NOTEBOOKS.METRICS);
};
