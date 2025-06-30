import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { WorkspacePageWrapper } from "@/components/pageWrappers/WorkspacePageWrapper";
import { Sidebar } from "@/components/Sidebar";
import { TS_KEYS } from "@/constants/tanStackQueryKeys";
import { dbGetNotebooks } from "@/db/queries/notebooks";
import { STATUSES } from "@/models/types/status";
import { getQueryClient } from "@/utils/getQueryClient";
import { getUserSSOrRedirect } from "@/utils/server/getUserSSOrRedirect";

const ProtectedLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = await getUserSSOrRedirect();

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: TS_KEYS.ACTIVE_NOTEBOOKS,
    queryFn: () =>
      dbGetNotebooks({ ownerId: user.id, status: STATUSES.ACTIVE }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex min-h-screen">
        <Sidebar />
        <WorkspacePageWrapper>{children}</WorkspacePageWrapper>
      </div>
    </HydrationBoundary>
  );
};

export default ProtectedLayout;
