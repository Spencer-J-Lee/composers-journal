import { dbGetNotebooks } from "@/db/queries/notebooks";
import { STATUSES } from "@/models/types/status";
import { NotebooksContent } from "@/modules/notebooks/list/NotebooksContent";
import { NotebooksEmptyCTA } from "@/modules/notebooks/list/NotebooksEmptyCTA";
import { getUserOrRedirect } from "@/utils/getUserOrRedirect";

const NotebooksPage = async () => {
  const user = await getUserOrRedirect();
  const notebooks = await dbGetNotebooks({
    ownerId: user.id,
    status: STATUSES.ACTIVE,
  });

  if (!notebooks.length) {
    return <NotebooksEmptyCTA />;
  }

  return <NotebooksContent />;
};

export default NotebooksPage;
