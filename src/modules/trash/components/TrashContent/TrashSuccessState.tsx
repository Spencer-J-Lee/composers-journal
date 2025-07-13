import { Button } from "@/components/buttons/Button";
import { WorkspaceContentWrapper } from "@/components/contentWrappers/WorkspaceContentWrapper";
import { WorkspacePageWrapper } from "@/components/pageWrappers/WorkspacePageWrapper";
import { StickyTopBar } from "@/components/StickyTopBar";
import { SUCCESS_MESSAGES } from "@/constants/messages";
import { useSoftDeleteEntries } from "@/hooks/cache/entries";
import { useSoftDeleteNotebooks } from "@/hooks/cache/notebooks";
import { handleErrorLogging } from "@/hooks/useLogError";
import { Entry } from "@/models/Entry";
import { Notebook } from "@/models/Notebook";
import { showSuccessToast } from "@/utils/client/toasts";

import { EntriesSection } from "./EntriesSection";
import { NotebooksSection } from "./NotebooksSection";

type TrashSuccessStateProps = {
  notebooks: Notebook[];
  entries: Entry[];
};

export const TrashSuccessState = ({
  notebooks,
  entries,
}: TrashSuccessStateProps) => {
  const { mutateAsync: softDeleteEntries, isPending: isDeleteEntriesPending } =
    useSoftDeleteEntries();
  const {
    mutateAsync: softDeleteNotebooks,
    isPending: isDeleteNotebooksPending,
  } = useSoftDeleteNotebooks();

  const handleEmptyTrash = async () => {
    if (!confirm("Empty trash?")) {
      return;
    }

    try {
      const promises = [];
      if (notebooks.length > 0) {
        promises.push(softDeleteNotebooks(notebooks.map((nb) => nb.id)));
      }
      if (entries.length > 0) {
        promises.push(softDeleteEntries(entries.map((en) => en.id)));
      }

      await Promise.all(promises);

      showSuccessToast(SUCCESS_MESSAGES.USER.TRASH_EMPTIED);
    } catch (err) {
      handleErrorLogging(err);
    }
  };

  return (
    <WorkspacePageWrapper paddingSize="none">
      <StickyTopBar>
        <Button
          onClick={() => handleEmptyTrash()}
          loading={isDeleteEntriesPending || isDeleteNotebooksPending}
          variant="negative"
          className="ml-auto"
        >
          Empty Trash
        </Button>
      </StickyTopBar>

      <WorkspaceContentWrapper>
        <div className="flex flex-col gap-y-8">
          <NotebooksSection />
          <EntriesSection />
        </div>
      </WorkspaceContentWrapper>
    </WorkspacePageWrapper>
  );
};
