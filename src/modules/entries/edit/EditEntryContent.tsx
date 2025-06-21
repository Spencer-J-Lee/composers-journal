import { Entry } from "@/models/Entry";

import { EditEntryForm } from "./EditEntryForm";

type EditEntryContentProps = {
  entry: Entry;
};

export const EditEntryContent = ({ entry }: EditEntryContentProps) => {
  return (
    <>
      <EditEntryForm entry={entry} />
    </>
  );
};
