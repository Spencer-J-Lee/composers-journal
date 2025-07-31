import { Card } from "@/components/Card";
import { DatesToDisplay } from "@/components/DateDisplay/types";
import { Notebook } from "@/models/Notebook";

import { NotebookControls } from "./NotebookControls";
import { NotebookControl } from "./NotebookControls/types";
import { NotebookInfo } from "./NotebookInfo";

type NotebookCardProps = {
  notebook: Notebook;
  controls: NotebookControl[];
  datesToDisplay?: DatesToDisplay;
};

export const NotebookCard = ({
  notebook,
  controls,
  datesToDisplay,
}: NotebookCardProps) => {
  return (
    <Card paddingSize="none">
      <div className="flex">
        <NotebookControls notebook={notebook} controls={controls} />
        <NotebookInfo notebook={notebook} datesToDisplay={datesToDisplay} />
      </div>
    </Card>
  );
};
