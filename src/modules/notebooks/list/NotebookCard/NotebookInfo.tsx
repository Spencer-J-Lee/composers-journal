import { Notebook } from "@/models/Notebook";

type NotebookInfoProps = {
  notebook: Notebook;
};

export const NotebookInfo = ({ notebook }: NotebookInfoProps) => {
  const { name, createdAt } = notebook;

  return (
    <div className="border-border flex flex-1 flex-col border-l p-4">
      <h2 className="mb-1 text-xl font-semibold">{name}</h2>

      <div className="mt-auto">
        <small className="text-text-muted">
          Created: {new Date(createdAt).toLocaleDateString()}
        </small>
      </div>
    </div>
  );
};
