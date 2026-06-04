import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  DYNAMIC_TS_KEYS,
  STATIC_TS_KEYS,
} from "@/constants/tanStackQueryKeys";
import { apiCreateTags } from "@/services/tags/create";
import { apiGetTags, ApiGetTagsProps } from "@/services/tags/get";

export const useTags = (params?: ApiGetTagsProps) => {
  return useQuery({
    // Params are part of the key so calls with different params
    // don't share a cache entry
    queryKey: DYNAMIC_TS_KEYS.TAGS_BY_PARAMS(params),
    queryFn: () => apiGetTags(params),
  });
};

export const useCreateTags = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiCreateTags,
    onSuccess: () => {
      // Ensure data integrity of cache after creation
      queryClient.invalidateQueries({
        queryKey: STATIC_TS_KEYS.TAGS,
      });
    },
  });
};
