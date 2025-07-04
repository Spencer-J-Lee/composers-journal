import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { DYNAMIC_TS_KEYS } from "@/constants/tanStackQueryKeys";
import { dbGetEntries } from "@/db/queries/entries";
import { getPaginationParams } from "@/getPaginationParams";
import { STATUSES } from "@/models/types/status";
import {
  DEFAULT_ENTRY_FILTER,
  ENTRIES_PAGE_LIMIT,
} from "@/modules/entries/list/EntriesFilter/constants";
import { NotebookContent } from "@/modules/entries/list/NotebookContent";
import { calcNextPage } from "@/utils/server/calcNextPage";
import { getUserSSOrRedirect } from "@/utils/server/getUserSSOrRedirect";
import { makeQueryClient } from "@/utils/server/makeQueryClient";

type NotebookPageProps = {
  params: Promise<{ notebookId: string }>;
};

const NotebookPage = async ({ params }: NotebookPageProps) => {
  const { notebookId } = await params;
  const parsedNotebookId = parseInt(notebookId);
  if (isNaN(parsedNotebookId)) {
    notFound();
  }

  const user = await getUserSSOrRedirect();
  const queryClient = makeQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: DYNAMIC_TS_KEYS.ENTRIES_BY_FILTERS(
      parsedNotebookId,
      DEFAULT_ENTRY_FILTER,
    ),
    queryFn: async ({ pageParam }) => {
      const entries = await dbGetEntries({
        ownerId: user.id,
        notebookId: parsedNotebookId,
        status: STATUSES.ACTIVE,
        ...getPaginationParams(pageParam, ENTRIES_PAGE_LIMIT),
      });

      return {
        entries,
        nextPage: calcNextPage(entries, pageParam, ENTRIES_PAGE_LIMIT),
      };
    },
    initialPageParam: 0,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotebookContent notebookId={parsedNotebookId} />
    </HydrationBoundary>
  );
};

export default NotebookPage;
