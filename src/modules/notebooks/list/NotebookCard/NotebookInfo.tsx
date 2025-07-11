import { Typography } from "@/components/Typography";
import { Notebook } from "@/models/Notebook";

type NotebookInfoProps = {
  notebook: Notebook;
};

export const NotebookInfo = ({ notebook }: NotebookInfoProps) => {
  const { name, createdAt } = notebook;

  return (
    <div className="border-border flex flex-1 flex-col border-l p-4">
      <Typography variant="h4" className="mb-1">
        {name}
      </Typography>

      <div className="mt-auto">
        <Typography variant="smallMuted">
          Created: {new Date(createdAt).toLocaleDateString()}
        </Typography>
      </div>
    </div>
  );
};
