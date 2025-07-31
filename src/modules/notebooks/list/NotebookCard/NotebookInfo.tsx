import Link from "next/link";

import { DateDisplay } from "@/components/DateDisplay";
import { DatesToDisplay } from "@/components/DateDisplay/types";
import { Typography } from "@/components/Typography";
import { routes } from "@/constants/routes";
import { Notebook } from "@/models/Notebook";

type NotebookInfoProps = {
  notebook: Notebook;
  datesToDisplay?: DatesToDisplay;
};

export const NotebookInfo = ({
  notebook,
  datesToDisplay,
}: NotebookInfoProps) => {
  const { name, createdAt, updatedAt, status } = notebook;

  return (
    <div className="border-border flex flex-1 flex-col items-start border-l p-4">
      <Link
        href={routes.notebook(notebook.id)}
        className="mb-1 hover:underline"
      >
        <Typography variant="h4">{name}</Typography>
      </Link>

      <div className="mt-auto">
        <Typography
          variant="smallMuted"
          className="flex items-center gap-x-1.5"
        >
          <DateDisplay
            createdAt={createdAt}
            updatedAt={updatedAt}
            status={status}
            datesToDisplay={datesToDisplay}
          />
        </Typography>
      </div>
    </div>
  );
};
