import { useQuery } from "@tanstack/react-query";

import { STATIC_TS_KEYS } from "@/constants/tanStackQueryKeys";
import { apiGetTags, apiGetTagsProps } from "@/services/tags/get";

export const useTags = (params?: apiGetTagsProps) => {
  return useQuery({
    queryKey: STATIC_TS_KEYS.TAGS,
    queryFn: () => apiGetTags(params),
  });
};
