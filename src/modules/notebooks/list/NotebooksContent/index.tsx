"use client";

import { useMemo, useState } from "react";
import {
  faArrowDown,
  faArrowUp,
  faEdit,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button } from "@/components/buttons/Button";
import { Card } from "@/components/Card";
import { IconButton } from "@/components/iconButtons/IconButton";
import { LinkIconButton } from "@/components/iconButtons/LinkIconButton";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants/messages";
import { routes } from "@/constants/routes";
import { useActiveNotebooks, useTrashNotebook } from "@/hooks/cache/notebooks";
import { Notebook } from "@/models/Notebook";
import { showErrorToast, showSuccessToast } from "@/utils/client/toasts";

import { SortBy } from "./types";
import { NotebooksEmptyCTA } from "../NotebooksEmptyCTA";

export const NotebooksContent = () => {
  const { data: notebooks, isPending } = useActiveNotebooks();
  const { mutateAsync: trashNotebook } = useTrashNotebook();
  const [sortBy, setSortBy] = useState<SortBy>("latest");

  const sortedNotebooks = useMemo(() => {
    if (!notebooks) return [];

    return notebooks.toSorted((a, b) => {
      switch (sortBy) {
        case "latest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "name asc":
          return b.name.localeCompare(a.name);
        case "name desc":
          return a.name.localeCompare(b.name);
      }
    });
  }, [notebooks, sortBy]);

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
    <>
      {/* TODO: filters UI */}
      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={() => setSortBy("latest")}
          variant={sortBy === "latest" ? "positive" : "default"}
        >
          Latest
        </Button>
        <Button
          size="sm"
          onClick={() => setSortBy("oldest")}
          variant={sortBy === "oldest" ? "positive" : "default"}
        >
          Oldest
        </Button>
        <Button
          size="sm"
          onClick={() =>
            setSortBy(sortBy === "name desc" ? "name asc" : "name desc")
          }
          variant={
            sortBy === "name desc" || sortBy === "name asc"
              ? "positive"
              : "default"
          }
        >
          Name{" "}
          {sortBy === "name desc" && <FontAwesomeIcon icon={faArrowDown} />}
          {sortBy === "name asc" && <FontAwesomeIcon icon={faArrowUp} />}
        </Button>
      </div>

      <ul className="flex flex-col gap-4">
        {sortedNotebooks.map((notebook) => (
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
              <small className="text-text-muted">
                Created: {new Date(notebook.createdAt).toLocaleDateString()}
              </small>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
};
