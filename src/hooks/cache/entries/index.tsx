import {
  QueryKey,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { DYNAMIC_TS_KEYS, STATIC_TS_KEYS } from "@/constants/tanStackQueryKeys";
import { Entry } from "@/models/Entry";
import { SavedItem } from "@/models/SavedItem";
import { ENTRIES_PAGE_LIMIT } from "@/modules/entries/list/EntriesFilter/constants";
import { EntryFilter } from "@/modules/entries/list/EntriesFilter/types";
import {
  apiGetFilteredEntriesPage,
  apiGetRecentlyUpdatedEntries,
  apiGetTrashedEntries,
} from "@/services/entries/get";
import {
  apiRestoreEntry,
  apiSoftDeleteEntries,
  apiSoftDeleteEntry,
  apiTrashEntry,
} from "@/services/entries/update";
import { apiCreateSavedEntry } from "@/services/savedItems/create";
import { apiDeleteSavedEntry } from "@/services/savedItems/delete";

import { InfiniteEntriesCache } from "./types";

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

export const useSoftDeleteEntries = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiSoftDeleteEntries,
    onSuccess: () => {
      // Maximize UI update speed through manual data manipulation
      queryClient.setQueryData<Entry[]>(STATIC_TS_KEYS.TRASHED_ENTRIES, []);

      // Ensure data integrity with follow-up revalidation
      queryClient.invalidateQueries({
        queryKey: STATIC_TS_KEYS.TRASHED_ENTRIES,
      });
    },
  });
};

export const useTrashEntry = (queryKey: QueryKey, onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiTrashEntry,
    onSuccess: (entry: Entry) => {
      // Maximize UI update speed through manual data manipulation
      queryClient.setQueryData<InfiniteEntriesCache>(queryKey, (prev) => {
        if (!prev) return undefined;

        return {
          ...prev,
          pages: [...prev.pages].map((page) => ({
            ...page,
            entries: page.entries.filter((en) => en.id !== entry.id),
          })),
        };
      });

      onSuccess?.();
      // TODO: do I want to revalidate infinite query here?
    },
  });
};

export const useSaveEntry = (queryKey: QueryKey) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiCreateSavedEntry,
    onSuccess: (savedItem: SavedItem) => {
      // Maximize UI update speed through manual data manipulation
      queryClient.setQueryData<InfiniteEntriesCache>(queryKey, (prev) => {
        if (!prev) return undefined;

        return {
          ...prev,
          pages: [...prev.pages].map((page) => ({
            ...page,
            entries: page.entries.map((entry) => {
              return entry.id === savedItem.entryId
                ? { ...entry, saved: true }
                : entry;
            }),
          })),
        };
      });
    },

    // TODO: do I want to revalidate infinite query here?
  });
};

export const useUnsaveEntry = (queryKey: QueryKey) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiDeleteSavedEntry,
    onSuccess: (savedItem: SavedItem) => {
      // Maximize UI update speed through manual data manipulation
      queryClient.setQueryData<InfiniteEntriesCache>(queryKey, (prev) => {
        if (!prev) return undefined;

        return {
          ...prev,
          pages: [...prev.pages].map((page) => ({
            ...page,
            entries: page.entries.map((entry) => {
              return entry.id === savedItem.entryId
                ? { ...entry, saved: false }
                : entry;
            }),
          })),
        };
      });

      // TODO: do I want to revalidate infinite query here?
    },
  });
};

export const useInfEntryPages = (
  notebookId: number,
  filters: EntryFilter,
  offset: number,
) => {
  return useInfiniteQuery({
    queryKey: DYNAMIC_TS_KEYS.ENTRIES_BY_FILTERS(notebookId, filters),
    queryFn: async ({ pageParam }) =>
      apiGetFilteredEntriesPage({
        notebookId,
        filters,
        page: pageParam,
        limit: ENTRIES_PAGE_LIMIT,
        offset,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};

export const useRecentlyUpdatedEntries = () => {
  return useQuery({
    queryKey: STATIC_TS_KEYS.RECENTLY_UPDATED_ENTRIES,
    queryFn: () => apiGetRecentlyUpdatedEntries(),
  });
};
