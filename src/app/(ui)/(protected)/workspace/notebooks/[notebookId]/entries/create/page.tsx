import { notFound } from "next/navigation";

import { WorkspacePageWrapper } from "@/components/pageWrappers/WorkspacePageWrapper";
import { CreateEntryContent } from "@/modules/entries/create/CreateEntryContent";

type CreateEntryPageProps = {
  params: Promise<{ notebookId: string }>;
};

const CreateEntryPage = async ({ params }: CreateEntryPageProps) => {
  const { notebookId } = await params;
  const parsedNotebookId = parseInt(notebookId);

  if (isNaN(parsedNotebookId)) {
    notFound();
  }

  return (
    <WorkspacePageWrapper>
      <CreateEntryContent notebookId={parsedNotebookId} />
    </WorkspacePageWrapper>
  );
};

export default CreateEntryPage;
