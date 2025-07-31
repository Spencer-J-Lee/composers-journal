import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { STATIC_TS_KEYS } from "@/constants/tanStackQueryKeys";
import { dbGetEntries } from "@/db/queries/entries/get";
import { dbGetNotebooks } from "@/db/queries/notebooks/get";
import { STATUSES } from "@/models/types/status";
import { TrashContent } from "@/modules/trash/components/TrashContent";
import { getUserSSOrRedirect } from "@/utils/server/getUserSSOrRedirect";
import { makeQueryClient } from "@/utils/server/makeQueryClient";

const TrashPage = async () => {
  const user = await getUserSSOrRedirect();
  const queryClient = makeQueryClient();

  // TODO: figure out how to prefetch without flashing loading state
  // or hydration mismatch
  queryClient.prefetchQuery({
    queryKey: STATIC_TS_KEYS.TRASHED_NOTEBOOKS,
    queryFn: () =>
      dbGetNotebooks({
        ownerId: user.id,
        status: STATUSES.TRASHED,
      }),
  });

  // TODO: figure out how to prefetch without flashing loading state
  // or hydration mismatch
  queryClient.prefetchQuery({
    queryKey: STATIC_TS_KEYS.TRASHED_ENTRIES,
    queryFn: () =>
      dbGetEntries({
        ownerId: user.id,
        status: STATUSES.TRASHED,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TrashContent />
    </HydrationBoundary>
  );
};

export default TrashPage;
