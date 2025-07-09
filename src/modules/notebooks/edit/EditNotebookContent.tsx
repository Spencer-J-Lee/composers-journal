"use client";

import { Notebook } from "@/models/Notebook";

import { EditNotebookForm } from "./EditNotebookForm";

type EditNotebookContentProps = {
  notebook: Notebook;
};

export const EditNotebookContent = ({ notebook }: EditNotebookContentProps) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-full max-w-80">
        <EditNotebookForm notebook={notebook} />
      </div>
    </div>
  );
};
