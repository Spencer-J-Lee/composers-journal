"use client";

import { useEffect, useState } from "react";

import { Entry } from "@/models/Entry";

import { EntryCard } from "./EntryCard";
import { apiGetEntries } from "@/services/entries/get";

export const Results = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    apiGetEntries().then((data) => {
      setEntries(data);
    });
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
