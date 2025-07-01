import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { TS_KEYS } from "@/constants/tanStackQueryKeys";
import { Notebook } from "@/models/Notebook";
import { apiGetActiveNotebooks } from "@/services/notebooks";
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
      queryClient.setQueryData<Notebook[]>(TS_KEYS.ACTIVE_NOTEBOOKS, (prev) =>
        prev ? [notebook, ...prev] : [notebook],
      );
    },
  });
};
