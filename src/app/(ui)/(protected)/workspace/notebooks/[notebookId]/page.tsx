import { notFound } from "next/navigation";

import { dbGetEntries } from "@/db/queries/entries";
import { STATUSES } from "@/models/types/status";
import { NotebookContent } from "@/modules/entries/list/NotebookContent";
import { NotebookEmptyState } from "@/modules/entries/list/NotebookEmptyState";
import { getUserSSOrRedirect } from "@/utils/server/getUserSSOrRedirect";

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
  const entries = await dbGetEntries({
    ownerId: user.id,
    notebookId: parsedNotebookId,
    status: STATUSES.ACTIVE,
  });

  if (!entries.length) {
    return <NotebookEmptyState notebookId={parsedNotebookId} />;
  }

  return <NotebookContent notebookId={parsedNotebookId} />;
};

export default NotebookPage;
