"use client";

import { useRouter } from "next/navigation";

import { routes } from "@/constants/routes";
import { useEditingNotebook } from "@/hooks/cache/notebooks";
import { Notebook } from "@/models/Notebook";

import { EditNotebookForm } from "./EditNotebookForm";

type EditNotebookContentProps = {
  notebookId: Notebook["id"];
};

export const EditNotebookContent = ({
  notebookId,
}: EditNotebookContentProps) => {
  const { data: notebook, isPending } = useEditingNotebook(notebookId);
  const router = useRouter();

  // TODO: handle loading UI
  if (isPending) return "Loading...";

  if (!notebook) {
    router.push(routes.notFound());
    return;
  }

  return (
    <div className="flex min-h-full w-full items-center justify-center">
      <div className="flex flex-col items-center">
        <EditNotebookForm notebook={notebook} />
      </div>
    </div>
  );
};
