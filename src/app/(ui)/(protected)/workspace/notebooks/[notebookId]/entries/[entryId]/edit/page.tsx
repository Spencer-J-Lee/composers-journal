import { notFound } from "next/navigation";

import { WorkspacePageWrapper } from "@/components/pageWrappers/WorkspacePageWrapper";
import { dbGetActiveEntryById } from "@/db/queries/entries/get";
import { Entry } from "@/models/Entry";
import { EditEntryContent } from "@/modules/entries/edit/EditEntryContent";
import { getUserSSOrRedirect } from "@/utils/server/getUserSSOrRedirect";

type EditEntryPageProps = {
  params: Promise<{ entryId: string }>;
};

const EditEntryPage = async ({ params }: EditEntryPageProps) => {
  const { entryId } = await params;
  const parsedEntryId = parseInt(entryId);
  if (isNaN(parsedEntryId)) {
    notFound();
  }

  const user = await getUserSSOrRedirect();

  // Scoping by ownerId ensures users can only open their own entries;
  // anything else 404s without leaking whether the entry exists.
  let entry: Entry;
  try {
    entry = await dbGetActiveEntryById(parsedEntryId, { ownerId: user.id });
  } catch {
    notFound();
  }

  return (
    <WorkspacePageWrapper paddingSize="sm">
      <EditEntryContent entry={entry} />
    </WorkspacePageWrapper>
  );
};

export default EditEntryPage;
