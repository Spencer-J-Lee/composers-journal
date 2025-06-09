import { notFound } from "next/navigation";

import { PageWrapper } from "@/components/pageWrappers/PageWrapper";
import { CreateEntryContent } from "@/modules/createEntry/components/CreateEntryContent";

type CreateEntryPageProps = {
  params: { notebookId: string };
};

const CreateEntryPage = ({ params }: CreateEntryPageProps) => {
  const notebookId = parseInt(params.notebookId);

  if (isNaN(notebookId)) {
    notFound();
  }

  return (
    <PageWrapper maxWidth="lg">
      <CreateEntryContent notebookId={notebookId} />
    </PageWrapper>
  );
};

export default CreateEntryPage;
