import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { Sidebar } from "@/components/Sidebar";
import { TS_KEYS } from "@/constants/tanStackQueryKeys";
import { dbGetNotebooks } from "@/db/queries/notebooks";
import { STATUSES } from "@/models/types/status";
import { getUserSSOrRedirect } from "@/utils/server/getUserSSOrRedirect";
import { makeQueryClient } from "@/utils/server/makeQueryClient";

const ProtectedLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = await getUserSSOrRedirect();
  const queryClient = makeQueryClient();

  await queryClient.prefetchQuery({
    queryKey: TS_KEYS.ACTIVE_NOTEBOOKS,
    queryFn: () =>
      dbGetNotebooks({ ownerId: user.id, status: STATUSES.ACTIVE }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex min-h-screen">
        <Sidebar />
        {children}
      </div>
    </HydrationBoundary>
  );
};

export default ProtectedLayout;
