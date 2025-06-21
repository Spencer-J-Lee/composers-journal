import { notFound } from "next/navigation";

import { dbGetNotebooks } from "@/db/queries/notebooks";
import { EditNotebookContent } from "@/modules/notebooks/edit/EditNotebookContent";
import { getUserOrNotFound } from "@/utils/getUserOrNotFound";

type EditNotebookPageProps = {
  params: { notebookId: string };
};

const EditNotebookPage = async ({ params }: EditNotebookPageProps) => {
  const { notebookId } = await params;
  const parsedNotebookId = parseInt(notebookId);
  if (isNaN(parsedNotebookId)) {
    notFound();
  }

  const user = await getUserOrNotFound();

  const notebook = (
    await dbGetNotebooks({ ownerId: user.id, id: parsedNotebookId })
  )[0];
  if (!notebook) {
    notFound();
  }

  return <EditNotebookContent notebook={notebook} />;
};

export default EditNotebookPage;
