import { CreateNotebookForm } from "../create/CreateNotebookForm";

export const CreateNotebookContent = () => {
  return (
    <div className="flex min-h-full w-full items-center justify-center">
      <div className="flex flex-col items-center">
        <CreateNotebookForm />
      </div>
    </div>
  );
};
