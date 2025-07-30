import Link from "next/link";

import { Typography } from "@/components/Typography";
import { routes } from "@/constants/routes";
import { Notebook } from "@/models/Notebook";

type NotebookInfoProps = {
  notebook: Notebook;
};

export const NotebookInfo = ({ notebook }: NotebookInfoProps) => {
  const { name, createdAt } = notebook;

  return (
    <div className="border-border flex flex-1 flex-col items-start border-l p-4">
      <Link
        href={routes.notebook(notebook.id)}
        className="mb-1 hover:underline"
      >
        <Typography variant="h4">{name}</Typography>
      </Link>

      <div className="mt-auto">
        <Typography variant="smallMuted">
          Created: {new Date(createdAt).toLocaleDateString()}
        </Typography>
      </div>
    </div>
  );
};
