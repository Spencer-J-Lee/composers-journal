"use client";

import { Notebook } from "@/models/Notebook";

import { EditNotebookForm } from "./EditNotebookForm";

type EditNotebookContentProps = {
  notebook: Notebook;
};

export const EditNotebookContent = ({ notebook }: EditNotebookContentProps) => {
  return (
    <div className="flex min-h-full w-full items-center justify-center">
      <div className="flex flex-col items-center">
        <EditNotebookForm notebook={notebook} />
      </div>
    </div>
  );
};
