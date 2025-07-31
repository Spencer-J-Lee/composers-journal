import { Button } from "@/components/buttons/Button";
import { WorkspaceContentWrapper } from "@/components/contentWrappers/WorkspaceContentWrapper";
import { commonAlertActions } from "@/components/dialogs/AlertDialog/constants";
import { WorkspacePageWrapper } from "@/components/pageWrappers/WorkspacePageWrapper";
import { StickyTopBar } from "@/components/StickyTopBar";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants/messages";
import { useSoftDeleteEntries } from "@/hooks/cache/entries";
import { useSoftDeleteNotebooks } from "@/hooks/cache/notebooks";
import { useAlert } from "@/hooks/useAlert";
import { Entry } from "@/models/Entry";
import { Notebook } from "@/models/Notebook";

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
  const { openAlert } = useAlert();
  const { mutateAsync: softDeleteEntries, isPending: isDeleteEntriesPending } =
    useSoftDeleteEntries();
  const {
    mutateAsync: softDeleteNotebooks,
    isPending: isDeleteNotebooksPending,
  } = useSoftDeleteNotebooks();

  const handleEmptyTrash = async () => {
    openAlert({
      title: "Are you sure?",
      description:
        "This will permanently delete all trashed items and cannot be undone.",
      actions: [
        commonAlertActions.cancel,
        {
          type: "async",
          key: "confirm",
          text: "Confirm",
          variant: "negative",
          onConfirm: async () => {
            const promises = [];

            if (notebooks.length > 0) {
              promises.push(softDeleteNotebooks(notebooks.map((nb) => nb.id)));
            }

            if (entries.length > 0) {
              promises.push(softDeleteEntries(entries.map((en) => en.id)));
            }

            await Promise.all(promises);
          },
          successMsg: SUCCESS_MESSAGES.USER.TRASH.EMPTY,
          errMsg: ERROR_MESSAGES.USER.TRASH.EMPTY,
        },
      ],
    });
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
