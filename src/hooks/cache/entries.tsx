import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { STATIC_TS_KEYS } from "@/constants/tanStackQueryKeys";
import { Entry } from "@/models/Entry";
import {
  apiGetTrashedEntries,
  apiRestoreEntry,
  apiSoftDeleteEntry,
} from "@/services/entries";

export const useTrashedEntries = () => {
  return useQuery({
    queryKey: STATIC_TS_KEYS.TRASHED_ENTRIES,
    queryFn: () => apiGetTrashedEntries(),
  });
};

export const useRestoreEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiRestoreEntry,
    onSuccess: (entry: Entry) => {
      // Maximize UI update speed through manual data manipulation
      queryClient.setQueryData<Entry[]>(
        STATIC_TS_KEYS.TRASHED_ENTRIES,
        (prev) => (prev ? prev.filter((en) => en.id !== entry.id) : []),
      );

      // Ensure data integrity with follow-up revalidation
      queryClient.invalidateQueries({
        queryKey: STATIC_TS_KEYS.TRASHED_ENTRIES,
      });
    },
  });
};

export const useSoftDeleteEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiSoftDeleteEntry,
    onSuccess: (entry: Entry) => {
      // Maximize UI update speed through manual data manipulation
      queryClient.setQueryData<Entry[]>(
        STATIC_TS_KEYS.TRASHED_ENTRIES,
        (prev) => (prev ? prev.filter((en) => en.id !== entry.id) : []),
      );

      // Ensure data integrity with follow-up revalidation
      queryClient.invalidateQueries({
        queryKey: STATIC_TS_KEYS.TRASHED_ENTRIES,
      });
    },
  });
};
