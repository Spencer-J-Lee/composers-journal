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

  const fetchNotebooks = queryClient.prefetchQuery({
    queryKey: STATIC_TS_KEYS.TRASHED_NOTEBOOKS,
    queryFn: () =>
      dbGetNotebooks({
        ownerId: user.id,
        status: STATUSES.TRASHED,
      }),
  });

  const fetchEntries = queryClient.prefetchQuery({
    queryKey: STATIC_TS_KEYS.TRASHED_ENTRIES,
    queryFn: () =>
      dbGetEntries({
        ownerId: user.id,
        status: STATUSES.TRASHED,
      }),
  });

  await Promise.all([fetchNotebooks, fetchEntries]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TrashContent />
    </HydrationBoundary>
  );
};

export default TrashPage;
