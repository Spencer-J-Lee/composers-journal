import { Card } from "@/components/Card";
import { Notebook } from "@/models/Notebook";

import { NotebookControls } from "./NotebookControls";
import { NotebookControl } from "./NotebookControls/types";
import { NotebookInfo } from "./NotebookInfo";

type NotebookCardProps = {
  notebook: Notebook;
  controls: NotebookControl[];
};

export const NotebookCard = ({ notebook, controls }: NotebookCardProps) => {
  return (
    <Card paddingSize="none">
      <div className="flex">
        <NotebookControls notebook={notebook} controls={controls} />
        <NotebookInfo notebook={notebook} className="border-border border-l" />
      </div>
    </Card>
  );
};
