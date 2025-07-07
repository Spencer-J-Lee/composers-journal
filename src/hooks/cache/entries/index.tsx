import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { DYNAMIC_TS_KEYS, STATIC_TS_KEYS } from "@/constants/tanStackQueryKeys";
import { Entry } from "@/models/Entry";
import { ENTRIES_PAGE_LIMIT } from "@/modules/entries/list/EntriesFilter/constants";
import { EntryFilter } from "@/modules/entries/list/EntriesFilter/types";
import {
  apiGetFilteredEntriesPage,
  apiGetTrashedEntries,
} from "@/services/entries/get";
import { apiRestoreEntry, apiSoftDeleteEntry } from "@/services/entries/update";

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

export const useInfEntryPages = (notebookId: number, filters: EntryFilter) => {
  return useInfiniteQuery({
    queryKey: DYNAMIC_TS_KEYS.ENTRIES_BY_FILTERS(notebookId, filters),
    queryFn: async ({ pageParam }) =>
      apiGetFilteredEntriesPage({
        notebookId,
        filters,
        page: pageParam,
        limit: ENTRIES_PAGE_LIMIT,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};
