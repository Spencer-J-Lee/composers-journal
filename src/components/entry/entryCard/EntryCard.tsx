"use client";

import { useState } from "react";
import { EntryControls } from "../entryControls/EntryControls";
import { EntryInfo } from "./EntryInfo";
import { ExamplesButton } from "./ExamplesButton";
import { Entry } from "@/lib/types/Entry";
import { Tags } from "../../tag/Tags";
import { Card } from "@/components/shared/card/Card";

interface EntryCardProps {
  entry: Entry;
  defaultShowTags?: boolean;
}

export const EntryCard = ({
  entry,
  defaultShowTags = false,
}: EntryCardProps) => {
  const { tags } = entry;
  const [showTags, setShowTags] = useState(defaultShowTags);

  return (
    <Card paddingSize="none">
      <div className="flex">
        <EntryControls />

        <EntryInfo
          entry={entry}
          showTags={showTags}
          setShowTags={setShowTags}
          className="border-border border-x"
        />

        <ExamplesButton />
      </div>

      {tags.length > 0 && showTags && (
        <Tags tags={tags} className="border-border border-t" />
      )}
    </Card>
  );
};
