import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { STATIC_TS_KEYS } from "@/constants/tanStackQueryKeys";
import { apiCreateTags } from "@/services/tags/create";
import { apiGetTags, ApiGetTagsProps } from "@/services/tags/get";

export const useTags = (params?: ApiGetTagsProps) => {
  return useQuery({
    queryKey: STATIC_TS_KEYS.TAGS,
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
