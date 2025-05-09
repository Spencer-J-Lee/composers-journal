"use client";

import { useEffect, useState } from "react";
import { EntryCard } from "../entryCard/EntryCard";
import { Entry } from "@/models/Entry";

export const Results = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    fetch("/api/entries/")
      .then((res) => res.json())
      .then((data) => setEntries(data));
  }, []);

  return (
    <section className="bg-background-light flex-1 px-8 py-5">
      <ul className="flex flex-col gap-4">
        {entries.map((entry) => (
          <li key={entry.title}>
            <EntryCard entry={entry} />
          </li>
        ))}
      </ul>
    </section>
  );
};
