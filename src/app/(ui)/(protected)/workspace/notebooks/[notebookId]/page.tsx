import { notFound } from "next/navigation";

import { NotebookContent } from "@/modules/notebooks/detail/NotebookContent";

type NotebookPageProps = {
  params: { notebookId: string };
};

const NotebookPage = async ({ params }: NotebookPageProps) => {
  const { notebookId } = await params;
  const parsedNotebookId = parseInt(notebookId);

  if (isNaN(parsedNotebookId)) {
    notFound();
  }

  return <NotebookContent notebookId={parsedNotebookId} />;
};

export default NotebookPage;
