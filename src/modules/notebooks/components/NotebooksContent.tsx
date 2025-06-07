"use client";

import { useEffect, useState } from "react";

import { Notebook } from "@/models/Notebook";
import { apiGetNotebooks } from "@/services/notebooks/get";

export const NotebooksContent = () => {
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);

  // TODO: setup redux
  useEffect(() => {
    apiGetNotebooks().then((data) => {
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
