"use client";

import { useEffect, useState } from "react";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { Card } from "@/components/Card";
import { IconButton } from "@/components/iconButtons/IconButton";
import { LinkIconButton } from "@/components/iconButtons/LinkIconButton";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants/messages";
import { routes } from "@/constants/routes";
import { Notebook } from "@/models/Notebook";
import { STATUSES } from "@/models/types/status";
import { apiGetNotebooks, apiTrashNotebook } from "@/services/notebooks";
import { showErrorToast, showSuccessToast } from "@/utils/toasts";

export const NotebooksContent = () => {
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);

  // TODO: setup redux
  useEffect(() => {
    apiGetNotebooks({ status: STATUSES.ACTIVE }).then((data) => {
      setNotebooks(data);
    });
  }, []);

  const trashNotebook = async ({ id, name }: Notebook) => {
    if (!confirm(`Trash notebook: ${name}?`)) {
      return;
    }

    try {
      await apiTrashNotebook({ id });
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
              onClick={() => trashNotebook(notebook)}
              textVariant="negative"
            />
          </Card>
        </li>
      ))}
    </ul>
  );
};
