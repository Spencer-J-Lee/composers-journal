"use client";

import { useState } from "react";
import { QueryKey } from "@tanstack/react-query";

import { Card } from "@/components/Card";
import { Entry } from "@/models/Entry";
import { Tags } from "@/modules/tags/components/Tags";

import { EntryControls } from "./EntryControls";
import { EntryControl } from "./EntryControls/types";
import { EntryInfo } from "./EntryInfo";

type EntryCardProps = {
  entry: Entry;
  controls: EntryControl[];
  queryKey: QueryKey;
  defaultShowTags?: boolean;
  onTrashSuccess?: () => void;
};

export const EntryCard = ({
  entry,
  controls,
  queryKey,
  defaultShowTags = false,
  onTrashSuccess,
}: EntryCardProps) => {
  const { tags } = entry;
  const [showTags, setShowTags] = useState(defaultShowTags);

  return (
    <Card paddingSize="none">
      <div className="flex">
        <EntryControls
          entry={entry}
          controls={controls}
          queryKey={queryKey}
          onTrashSuccess={onTrashSuccess}
        />

        <EntryInfo
          entry={entry}
          showTags={showTags}
          setShowTags={setShowTags}
          className="border-border border-l"
        />
      </div>

      {tags.length > 0 && showTags && (
        <Tags tags={tags} className="border-border border-t" />
      )}
    </Card>
  );
};
