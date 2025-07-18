import { faTags } from "@fortawesome/free-solid-svg-icons";

import { AlertDialog } from "@/components/dialogs/AlertDialog/AlertDialog";
import { commonAlertActions } from "@/components/dialogs/AlertDialog/constants";
import { IconButton } from "@/components/iconButtons/IconButton";

export const TagsDialog = () => {
  return (
    <AlertDialog
      trigger={<IconButton faIcon={faTags} className="shrink-0" />}
      title="Tags Editor"
      size="sm"
      actions={[
        commonAlertActions.cancel,
        {
          text: "Save",
          variant: "default",
          onClick: () => null,
        },
      ]}
    >
      tags editor
    </AlertDialog>
  );
};
