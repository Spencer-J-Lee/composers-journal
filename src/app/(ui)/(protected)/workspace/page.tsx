import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { WorkspacePageWrapper } from "@/components/pageWrappers/WorkspacePageWrapper";
import { RECENTLY_UPDATED_ENTRIES_PARAMS } from "@/constants/entryParams";
import { STATIC_TS_KEYS } from "@/constants/tanStackQueryKeys";
import { dbGetEntries, dbGetEntryMetrics } from "@/db/queries/entries/get";
import { dbGetNotebookMetrics } from "@/db/queries/notebooks/get";
import { DashboardContent } from "@/modules/dashboard/DashboardContent";
import { getUserSSOrRedirect } from "@/utils/server/getUserSSOrRedirect";
import { makeQueryClient } from "@/utils/server/makeQueryClient";

const WorkspacePage = async () => {
  const user = await getUserSSOrRedirect();
  const queryClient = makeQueryClient();

  await queryClient.prefetchQuery({
    queryKey: STATIC_TS_KEYS.RECENTLY_UPDATED_ENTRIES,
    queryFn: async () =>
      dbGetEntries({
        ownerId: user.id,
        ...RECENTLY_UPDATED_ENTRIES_PARAMS,
      }),
  });

  await queryClient.prefetchQuery({
    queryKey: STATIC_TS_KEYS.NOTEBOOK_METRICS,
    queryFn: async () => dbGetNotebookMetrics({ ownerId: user.id }),
  });

  await queryClient.prefetchQuery({
    queryKey: STATIC_TS_KEYS.ENTRY_METRICS,
    queryFn: async () => dbGetEntryMetrics({ ownerId: user.id }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WorkspacePageWrapper>
        <DashboardContent />
      </WorkspacePageWrapper>
    </HydrationBoundary>
  );
};

export default WorkspacePage;
