"use client";

import { useEffect, useState } from "react";

import { Entry } from "@/models/Entry";
import { Notebook } from "@/models/Notebook";
import { EntryCard } from "@/modules/search/components/EntryCard";
import { apiGetActiveEntriesForNotebook } from "@/services/entries";

type NotebookContentProps = {
  notebookId: Notebook["id"];
};

export const NotebookContent = ({ notebookId }: NotebookContentProps) => {
  const [entries, setEntries] = useState<Entry[]>([]);

  // TODO: setup redux
  useEffect(() => {
    if (notebookId) {
      apiGetActiveEntriesForNotebook({ notebookId }).then((data) => {
        setEntries(data);
      });
    }
  }, [notebookId]);

  return (
    <section className="bg-background-light flex-1 px-8 py-5">
      <ul className="flex flex-col gap-4">
        {entries.map((entry) => (
          <li key={entry.id}>
            <EntryCard entry={entry} />
          </li>
        ))}
      </ul>
    </section>
  );
};
