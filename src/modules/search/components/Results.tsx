"use client";

import { useEffect, useState } from "react";

import { Entry } from "@/models/Entry";
import { STATUSES } from "@/models/types/status";
import { apiGetEntries } from "@/services/entries";

import { EntryCard } from "./EntryCard";

export const Results = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  // TODO: setup redux
  useEffect(() => {
    apiGetEntries({ status: STATUSES.ACTIVE }).then((data) => {
      setEntries(data);
    });
  }, []);

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
