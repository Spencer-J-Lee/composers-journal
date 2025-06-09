"use client";

import { useEffect, useState } from "react";

import { Notebook } from "@/models/Notebook";
import { STATUSES } from "@/models/types";
import { apiGetNotebooks } from "@/services/notebooks/get";

export const NotebooksContent = () => {
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);

  // TODO: setup redux
  useEffect(() => {
    apiGetNotebooks({ status: STATUSES.ACTIVE }).then((data) => {
      setNotebooks(data);
    });
  }, []);

  return (
    <ul className="flex flex-col gap-4">
      {notebooks.map((notebook) => (
        <li key={notebook.name}>{notebook.name}</li>
      ))}
    </ul>
  );
};
