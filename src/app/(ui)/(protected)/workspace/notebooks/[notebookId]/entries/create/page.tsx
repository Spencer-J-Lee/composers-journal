import { notFound } from "next/navigation";

import { PageWrapper } from "@/components/pageWrappers/PageWrapper";
import { CreateEntryContent } from "@/modules/createEntry/components/CreateEntryContent";

type CreateEntryPageProps = {
  params: { notebookId: string };
};

const CreateEntryPage = async ({ params }: CreateEntryPageProps) => {
  const { notebookId } = await params;
  const parsedNotebookId = parseInt(notebookId);

  if (isNaN(parsedNotebookId)) {
    notFound();
  }

  return (
    <PageWrapper maxWidth="lg">
      <CreateEntryContent notebookId={parsedNotebookId} />
    </PageWrapper>
  );
};

export default CreateEntryPage;
