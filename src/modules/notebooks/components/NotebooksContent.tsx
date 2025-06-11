"use client";

import { useEffect, useState } from "react";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { IconButton } from "@/components/iconButtons/IconButton";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants/messages";
import { Notebook } from "@/models/Notebook";
import { STATUSES } from "@/models/types";
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
        <li className="flex gap-x-2" key={notebook.name}>
          {notebook.name}
          {/* TODO: notebook edit link */}
          <IconButton
            faIcon={faTrashCan}
            onClick={() => trashNotebook(notebook)}
            variant="negative"
          />
        </li>
      ))}
    </ul>
  );
};
