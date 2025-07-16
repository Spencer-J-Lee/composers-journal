import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { STATIC_TS_KEYS } from "@/constants/tanStackQueryKeys";
import { Notebook } from "@/models/Notebook";
import { apiCreateNotebook } from "@/services/notebooks/create";
import {
  apiGetActiveNotebooks,
  apiGetTrashedNotebooks,
} from "@/services/notebooks/get";
import {
  apiRestoreNotebook,
  apiSoftDeleteNotebook,
  apiSoftDeleteNotebooks,
  apiTrashNotebook,
  apiUpdateNotebook,
} from "@/services/notebooks/update";

export const useActiveNotebooks = () => {
  return useQuery({
    queryKey: STATIC_TS_KEYS.ACTIVE_NOTEBOOKS,
    queryFn: () => apiGetActiveNotebooks(),
  });
};

export const useTrashedNotebooks = () => {
  return useQuery({
    queryKey: STATIC_TS_KEYS.TRASHED_NOTEBOOKS,
    queryFn: () => apiGetTrashedNotebooks(),
  });
};

export const useCreateNotebook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiCreateNotebook,
    onSuccess: (notebook: Notebook) => {
      // Maximize UI update speed through manual data manipulation
      queryClient.setQueryData<Notebook[]>(
        STATIC_TS_KEYS.ACTIVE_NOTEBOOKS,
        (prev) => (prev ? [...prev, notebook] : [notebook]),
      );

      // Ensure data integrity with follow-up revalidation
      queryClient.invalidateQueries({
        queryKey: STATIC_TS_KEYS.ACTIVE_NOTEBOOKS,
      });
    },
  });
};

export const useTrashNotebook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiTrashNotebook,
    onSuccess: (notebook: Notebook) => {
      // Maximize UI update speed through manual data manipulation
      queryClient.setQueryData<Notebook[]>(
        STATIC_TS_KEYS.ACTIVE_NOTEBOOKS,
        (prev) => (prev ? prev.filter((nb) => nb.id !== notebook.id) : []),
      );

      // Ensure data integrity with follow-up revalidation
      queryClient.invalidateQueries({
        queryKey: STATIC_TS_KEYS.ACTIVE_NOTEBOOKS,
      });
      queryClient.invalidateQueries({
        queryKey: STATIC_TS_KEYS.TRASHED_NOTEBOOKS,
      });
    },
  });
};

export const useRestoreNotebook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiRestoreNotebook,
    onSuccess: (notebook: Notebook) => {
      // Maximize UI update speed through manual data manipulation
      queryClient.setQueryData<Notebook[]>(
        STATIC_TS_KEYS.ACTIVE_NOTEBOOKS,
        (prev) => (prev ? [...prev, notebook] : [notebook]),
      );
      queryClient.setQueryData<Notebook[]>(
        STATIC_TS_KEYS.TRASHED_NOTEBOOKS,
        (prev) => (prev ? prev.filter((nb) => nb.id !== notebook.id) : []),
      );

      // Ensure data integrity with follow-up revalidation
      queryClient.invalidateQueries({
        queryKey: STATIC_TS_KEYS.ACTIVE_NOTEBOOKS,
      });
      queryClient.invalidateQueries({
        queryKey: STATIC_TS_KEYS.TRASHED_NOTEBOOKS,
      });
    },
  });
};

export const useSoftDeleteNotebook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiSoftDeleteNotebook,
    onSuccess: (notebook: Notebook) => {
      // Maximize UI update speed through manual data manipulation
      queryClient.setQueryData<Notebook[]>(
        STATIC_TS_KEYS.TRASHED_NOTEBOOKS,
        (prev) => (prev ? prev.filter((nb) => nb.id !== notebook.id) : []),
      );

      // Ensure data integrity with follow-up revalidation
      queryClient.invalidateQueries({
        queryKey: STATIC_TS_KEYS.TRASHED_NOTEBOOKS,
      });
    },
  });
};

export const useSoftDeleteNotebooks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiSoftDeleteNotebooks,
    onSuccess: () => {
      // Maximize UI update speed through manual data manipulation
      queryClient.setQueryData<Notebook[]>(
        STATIC_TS_KEYS.TRASHED_NOTEBOOKS,
        [],
      );

      // Ensure data integrity with follow-up revalidation
      queryClient.invalidateQueries({
        queryKey: STATIC_TS_KEYS.TRASHED_NOTEBOOKS,
      });
    },
  });
};

export const useEditNotebook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiUpdateNotebook,
    onSuccess: (notebook: Notebook) => {
      // Maximize UI update speed through manual data manipulation
      queryClient.setQueryData<Notebook[]>(
        STATIC_TS_KEYS.ACTIVE_NOTEBOOKS,
        (prev) => {
          for (const nb of prev ?? []) {
            if (nb.id === notebook.id) {
              nb.name = notebook.name;
              break;
            }
          }

          return prev;
        },
      );

      // Ensure data integrity with follow-up revalidation
      queryClient.invalidateQueries({
        queryKey: STATIC_TS_KEYS.ACTIVE_NOTEBOOKS,
      });
    },
  });
};
