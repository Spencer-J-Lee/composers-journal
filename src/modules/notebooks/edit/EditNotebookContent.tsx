import { Notebook } from "@/models/Notebook";

import { EditNotebookForm } from "./EditNotebookForm";

type EditNotebookContentProps = {
  notebook: Notebook;
};

// TODO: style + copy
export const EditNotebookContent = ({ notebook }: EditNotebookContentProps) => {
  return (
    <>
      <EditNotebookForm notebook={notebook} />
    </>
  );
};
