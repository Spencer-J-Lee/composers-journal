import { TS_KEYS } from "@/constants/tanStackQueryKeys";
import { Notebook } from "@/models/Notebook";
import { NotebooksContent } from "@/modules/notebooks/list/NotebooksContent";
import { NotebooksEmptyCTA } from "@/modules/notebooks/list/NotebooksEmptyCTA";
import { getQueryClient } from "@/utils/getQueryClient";

const NotebooksPage = async () => {
  const queryClient = getQueryClient();
  const notebooks = queryClient.getQueryData<Notebook[]>(
    TS_KEYS.ACTIVE_NOTEBOOKS,
  );

  return notebooks?.length === 0 ? <NotebooksEmptyCTA /> : <NotebooksContent />;
};

export default NotebooksPage;
