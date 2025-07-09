import { CreateNotebookForm } from "../create/CreateNotebookForm";

export const CreateNotebookContent = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-full max-w-80">
        <CreateNotebookForm />
      </div>
    </div>
  );
};
