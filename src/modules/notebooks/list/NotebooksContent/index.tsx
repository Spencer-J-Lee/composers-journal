@ -1,60 +0,0 @@
"use client";

import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { Card } from "@/components/Card";
import { IconButton } from "@/components/iconButtons/IconButton";
import { LinkIconButton } from "@/components/iconButtons/LinkIconButton";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants/messages";
import { routes } from "@/constants/routes";
import { useActiveNotebooks, useTrashNotebook } from "@/hooks/cache/notebooks";
import { Notebook } from "@/models/Notebook";
import { showErrorToast, showSuccessToast } from "@/utils/client/toasts";

import { NotebooksEmptyCTA } from "./NotebooksEmptyCTA";

export const NotebooksContent = () => {
  const { data: notebooks, isPending } = useActiveNotebooks();
  const { mutateAsync: trashNotebook } = useTrashNotebook();

  if (!notebooks) return <NotebooksEmptyCTA />;

  // TODO: handle loading UI
  if (isPending) return "Loading...";

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
    <ul className="flex flex-col gap-4">
      {notebooks.map((notebook) => (
        <li key={notebook.name}>
          <Card className="flex items-center gap-x-2" paddingSize="sm">
            {notebook.name}

            <LinkIconButton
              href={routes.notebookEdit(notebook.id)}
              faIcon={faEdit}
            />
            <IconButton
              faIcon={faTrashCan}
              onClick={() => handleTrashNotebook(notebook)}
              textVariant="negative"
            />
          </Card>
        </li>
      ))}
    </ul>
  );
};