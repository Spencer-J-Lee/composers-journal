import { notFound } from "next/navigation";

import { WorkspacePageWrapper } from "@/components/pageWrappers/WorkspacePageWrapper";
import { dbGetActiveEntryById } from "@/db/queries/entries/get";
import { EditEntryContent } from "@/modules/entries/edit/EditEntryContent";

type EditEntryPageProps = {
  params: Promise<{ entryId: string }>;
};

const EditEntryPage = async ({ params }: EditEntryPageProps) => {
  const { entryId } = await params;
  const parsedEntryId = parseInt(entryId);
  if (isNaN(parsedEntryId)) {
    notFound();
  }

  const entry = await dbGetActiveEntryById(parsedEntryId);
  if (!entry) {
    notFound();
  }

  return (
    <WorkspacePageWrapper>
      <EditEntryContent entry={entry} />
    </WorkspacePageWrapper>
  );
};

export default EditEntryPage;
