"use client";

import { useState } from "react";
import { EntryControls } from "./entryControls/EntryControls";
import { EntryInfo } from "./EntryInfo";
import { ExamplesButton } from "./ExamplesButton";
import { Entry } from "@/models/Entry";
import { Tags } from "./Tags";

interface EntryCardProps {
  entry: Entry;
  defaultShowTags?: boolean;
}

export const EntryCard = ({
  entry,
  defaultShowTags = true,
}: EntryCardProps) => {
  const { title, description, youtube_urls, tags } = entry;
  const [showTags, setShowTags] = useState(defaultShowTags);

  return (
    <div className="bg-surface rounded shadow-sm">
      <div className="flex">
        <EntryControls />

        <EntryInfo
          title={title}
          description={description}
          tags={tags}
          showTags={showTags}
          setShowTags={setShowTags}
        />

        <ExamplesButton />
      </div>

      {tags.length > 0 && showTags && <Tags tags={tags} />}
    </div>
  );
};
