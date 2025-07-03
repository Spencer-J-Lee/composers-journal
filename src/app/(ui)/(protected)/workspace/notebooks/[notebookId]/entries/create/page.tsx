import { notFound } from "next/navigation";

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

  return <CreateEntryContent notebookId={parsedNotebookId} />;
};

export default CreateEntryPage;
