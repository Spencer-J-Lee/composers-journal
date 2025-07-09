import { CollapsibleSection } from "@/components/CollapsibleSection";
import { SimpleFilters } from "@/components/SimpleFilters";
import { useTrashedNotebooks } from "@/hooks/cache/notebooks";
import { useSortedNotebooks } from "@/modules/notebooks/hooks/useSortedNotebooks";
import { NotebookCard } from "@/modules/notebooks/list/NotebookCard";

export const NotebooksSection = () => {
  const { data: notebooks } = useTrashedNotebooks();
  const { sortBy, setSortBy, sortedNotebooks } = useSortedNotebooks(notebooks);

  if (!notebooks?.length) {
    return null;
  }

  return (
    <CollapsibleSection title="Notebooks">
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
    </CollapsibleSection>
  );
};
