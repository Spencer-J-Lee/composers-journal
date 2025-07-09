import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { WorkspacePageWrapper } from "@/components/pageWrappers/WorkspacePageWrapper";
import { RECENTLY_UPDATED_ENTRIES_PARAMS } from "@/constants/entryParams";
import { STATIC_TS_KEYS } from "@/constants/tanStackQueryKeys";
import { dbGetEntries } from "@/db/queries/entries/get";
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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WorkspacePageWrapper>
        <DashboardContent />
      </WorkspacePageWrapper>
    </HydrationBoundary>
  );
};

export default WorkspacePage;
