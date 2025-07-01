import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { TS_KEYS } from "@/constants/tanStackQueryKeys";
import { dbGetActiveNotebookById } from "@/db/queries/notebooks/get";
import { EditNotebookContent } from "@/modules/notebooks/edit/EditNotebookContent";
import { makeQueryClient } from "@/utils/server/makeQueryClient";

type EditNotebookPageProps = {
  params: { notebookId: string };
};

const EditNotebookPage = async ({ params }: EditNotebookPageProps) => {
  const { notebookId } = await params;
  const parsedNotebookId = parseInt(notebookId);
  if (isNaN(parsedNotebookId)) {
    notFound();
  }

  const queryClient = makeQueryClient();
  const notebook = await queryClient.fetchQuery({
    queryKey: TS_KEYS.NOTEBOOK_BEING_EDITED,
    queryFn: () => dbGetActiveNotebookById(parsedNotebookId),
  });
  if (!notebook) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditNotebookContent notebookId={parsedNotebookId} />
    </HydrationBoundary>
  );
};

export default EditNotebookPage;
