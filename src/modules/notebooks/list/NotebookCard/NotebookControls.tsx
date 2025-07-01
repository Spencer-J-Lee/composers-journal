"use client";

import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { IconButton } from "@/components/iconButtons/IconButton";
import { LinkIconButton } from "@/components/iconButtons/LinkIconButton";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants/messages";
import { routes } from "@/constants/routes";
import { useTrashNotebook } from "@/hooks/cache/notebooks";
import { Notebook } from "@/models/Notebook";
import { showErrorToast, showSuccessToast } from "@/utils/client/toasts";

type NotebookControlsProps = {
  notebook: Notebook;
};

export const NotebookControls = ({ notebook }: NotebookControlsProps) => {
  const { mutateAsync: trashNotebook } = useTrashNotebook();

  const handleTrashNotebook = async ({ id, name }: Notebook) => {
    if (!confirm(`Trash notebook: ${name}?`)) {
      return;
    }

    try {
      await trashNotebook(id);
      showSuccessToast(SUCCESS_MESSAGES.USER.TRASH.NOTEBOOK);
    } catch (err) {
      console.error(err);
      showErrorToast(ERROR_MESSAGES.USER.TRASH.NOTEBOOK);
    }
  };

  return (
    <div className="flex flex-col items-center gap-1 p-2">
      <LinkIconButton href={routes.notebookEdit(notebook.id)} faIcon={faEdit} />
      <IconButton
        faIcon={faTrashCan}
        onClick={() => handleTrashNotebook(notebook)}
        textVariant="negative"
      />
    </div>
  );
};
