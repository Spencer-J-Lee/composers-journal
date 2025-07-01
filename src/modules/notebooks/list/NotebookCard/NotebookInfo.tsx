import clsx from "clsx";

import { Notebook } from "@/models/Notebook";

type NotebookInfoProps = {
  notebook: Notebook;
  className?: string;
};

export const NotebookInfo = ({ notebook, className }: NotebookInfoProps) => {
  const { name, createdAt } = notebook;

  return (
    <div className={clsx("flex flex-1 flex-col p-4", className)}>
      <h2 className="mb-1 text-xl font-semibold">{name}</h2>

      <div className="mt-auto">
        <small className="text-text-muted">
          Created: {new Date(createdAt).toLocaleDateString()}
        </small>
      </div>
    </div>
  );
};
