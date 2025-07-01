import { useState } from "react";
import { faChevronDown,faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Collapsible } from "@/components/Collapsible";
import { SimpleFilters } from "@/components/SimpleFilters";
import { Typography } from "@/components/Typography";
import { useTrashedNotebooks } from "@/hooks/cache/notebooks";
import { useSortedNotebooks } from "@/modules/notebooks/hooks/useSortedNotebooks";
import { NotebookCard } from "@/modules/notebooks/list/NotebookCard";

export const NotebooksSection = () => {
  const { data: notebooks } = useTrashedNotebooks();
  const { sortBy, setSortBy, sortedNotebooks } = useSortedNotebooks(notebooks);
  const [show, setShow] = useState(true);

  if (!notebooks?.length) {
    return null;
  }

  return (
    <section>
      <button
        className="mb-2 flex w-full items-center gap-x-3 rounded text-left"
        onClick={() => setShow((prev) => !prev)}
      >
        <Typography variant="h2">Notebooks</Typography>
        <FontAwesomeIcon icon={show ? faChevronUp : faChevronDown} />
      </button>

      <Collapsible show={show}>
        <SimpleFilters sortBy={sortBy} setSortBy={setSortBy} className="mb-4" />

        <ul className="flex flex-col gap-4">
          {sortedNotebooks.map((notebook) => (
            <li key={notebook.id}>
              <NotebookCard
                notebook={notebook}
                controls={["restore", "delete"]}
              />
            </li>
          ))}
        </ul>
      </Collapsible>
    </section>
  );
};
