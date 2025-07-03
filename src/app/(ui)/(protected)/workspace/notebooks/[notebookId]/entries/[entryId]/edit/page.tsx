import { notFound } from "next/navigation";

import { dbGetEntries } from "@/db/queries/entries";
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

  const entry = (await dbGetEntries({ id: parsedEntryId }))[0];
  if (!entry) {
    notFound();
  }

  return <EditEntryContent entry={entry} />;
};

export default EditEntryPage;
