"use client";

import { useEffect, useState } from "react";

import { Collection } from "@/models/Collection";
import { apiGetCollections } from "@/services/collections/get";

export const CollectionsContent = () => {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    apiGetCollections().then((data) => {
      setCollections(data);
    });
  }, []);

  return (
    <section className="flex-1 px-8 py-5">
      <ul className="flex flex-col gap-4">
        {collections.map((collection) => (
          <li key={collection.name}>{collection.name}</li>
        ))}
      </ul>
    </section>
  );
};
