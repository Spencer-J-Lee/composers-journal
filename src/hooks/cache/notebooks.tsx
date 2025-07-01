import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { TS_KEYS } from "@/constants/tanStackQueryKeys";
import { Notebook } from "@/models/Notebook";
import { apiGetActiveNotebooks, apiTrashNotebook } from "@/services/notebooks";
import { apiCreateNotebook } from "@/services/notebooks/create";

export const useActiveNotebooks = () => {
  return useQuery({
    queryKey: TS_KEYS.ACTIVE_NOTEBOOKS,
    queryFn: () => apiGetActiveNotebooks(),
  });
};

export const useCreateNotebook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiCreateNotebook,
    onSuccess: (notebook: Notebook) => {
      // Maximize UI update speed through manual data insertion
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
      // Maximize UI update speed through manual data insertion
      queryClient.setQueryData<Notebook[]>(TS_KEYS.ACTIVE_NOTEBOOKS, (prev) =>
        prev ? prev.filter((nb) => nb.id !== notebook.id) : [],
      );

      // Ensure data integrity with follow-up revalidation
      queryClient.invalidateQueries({ queryKey: TS_KEYS.ACTIVE_NOTEBOOKS });
      queryClient.invalidateQueries({ queryKey: TS_KEYS.TRASHED_NOTEBOOKS });
    },
  });
};
