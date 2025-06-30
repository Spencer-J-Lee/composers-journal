import { useQuery } from "@tanstack/react-query";

import { TS_KEYS } from "@/constants/tanStackQueryKeys";
import { apiGetActiveNotebooks } from "@/services/notebooks";

export const useActiveNotebooks = () => {
  return useQuery({
    queryKey: TS_KEYS.ACTIVE_NOTEBOOKS,
    queryFn: () => apiGetActiveNotebooks(),
  });
};
