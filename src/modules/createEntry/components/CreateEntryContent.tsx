import { CreateEntryForm } from "./CreateEntryForm";

type CreateEntryContentProps = {
  notebookId: number;
};

export const CreateEntryContent = ({ notebookId }: CreateEntryContentProps) => {
  return (
    <>
      <CreateEntryForm notebookId={notebookId} />
    </>
  );
};
