import { Card } from "@/components/Card";
import { Notebook } from "@/models/Notebook";

import { NotebookControls } from "./NotebookControls";
import { NotebookInfo } from "./NotebookInfo";

type NotebookCardProps = {
  notebook: Notebook;
};

export const NotebookCard = ({ notebook }: NotebookCardProps) => {
  return (
    <Card paddingSize="none">
      <div className="flex">
        <NotebookControls notebook={notebook} />
        <NotebookInfo notebook={notebook} className="border-border border-l" />
      </div>
    </Card>
  );
};
