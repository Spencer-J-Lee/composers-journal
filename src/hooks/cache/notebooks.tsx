import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { TS_KEYS } from "@/constants/tanStackQueryKeys";
import { Notebook } from "@/models/Notebook";
import {
  apiGetActiveNotebooks,
  apiGetTrashedNotebooks,
  apiRestoreNotebook,
  apiSoftDeleteNotebook,
  apiTrashNotebook,
} from "@/services/notebooks";
import { apiCreateNotebook } from "@/services/notebooks/create";

export const useActiveNotebooks = () => {
  return useQuery({
    queryKey: TS_KEYS.ACTIVE_NOTEBOOKS,
    queryFn: () => apiGetActiveNotebooks(),
  });
};

export const useTrashedNotebooks = () => {
  return useQuery({
    queryKey: TS_KEYS.TRASHED_NOTEBOOKS,
    queryFn: () => apiGetTrashedNotebooks(),
  });
};

export const useCreateNotebook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiCreateNotebook,
    onSuccess: (notebook: Notebook) => {
      // Maximize UI update speed through manual data manipulation
      queryClient.setQueryData<Notebook[]>(TS_KEYS.ACTIVE_NOTEBOOKS, (prev) =>
        prev ? [...prev, notebook] : [notebook],
      );

      // Ensure data integrity with follow-up revalidation
      queryClient.invalidateQueries({ queryKey: TS_KEYS.ACTIVE_NOTEBOOKS });
    },
  });
};

export const useTrashNotebook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiTrashNotebook,
    onSuccess: (notebook: Notebook) => {
      // Maximize UI update speed through manual data manipulation
      queryClient.setQueryData<Notebook[]>(TS_KEYS.ACTIVE_NOTEBOOKS, (prev) =>
        prev ? prev.filter((nb) => nb.id !== notebook.id) : [],
      );

      // Ensure data integrity with follow-up revalidation
      queryClient.invalidateQueries({ queryKey: TS_KEYS.ACTIVE_NOTEBOOKS });
      queryClient.invalidateQueries({ queryKey: TS_KEYS.TRASHED_NOTEBOOKS });
    },
  });
};

export const useRestoreNotebook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiRestoreNotebook,
    onSuccess: (notebook: Notebook) => {
      // Maximize UI update speed through manual data manipulation
      queryClient.setQueryData<Notebook[]>(TS_KEYS.ACTIVE_NOTEBOOKS, (prev) =>
        prev ? [...prev, notebook] : [notebook],
      );
      queryClient.setQueryData<Notebook[]>(TS_KEYS.TRASHED_NOTEBOOKS, (prev) =>
        prev ? prev.filter((nb) => nb.id !== notebook.id) : [],
      );

      // Ensure data integrity with follow-up revalidation
      queryClient.invalidateQueries({ queryKey: TS_KEYS.ACTIVE_NOTEBOOKS });
      queryClient.invalidateQueries({ queryKey: TS_KEYS.TRASHED_NOTEBOOKS });
    },
  });
};

export const useSoftDeleteNotebook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiSoftDeleteNotebook,
    onSuccess: (notebook: Notebook) => {
      // Maximize UI update speed through manual data manipulation
      queryClient.setQueryData<Notebook[]>(TS_KEYS.TRASHED_NOTEBOOKS, (prev) =>
        prev ? prev.filter((nb) => nb.id !== notebook.id) : [],
      );

      // Ensure data integrity with follow-up revalidation
      queryClient.invalidateQueries({ queryKey: TS_KEYS.TRASHED_NOTEBOOKS });
    },
  });
};
