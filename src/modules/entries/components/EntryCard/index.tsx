"use client";

import { useState } from "react";
import { QueryKey } from "@tanstack/react-query";

import { Card } from "@/components/Card";
import { Collapsible } from "@/components/Collapsible";
import { DatesToDisplay } from "@/components/DateDisplay/types";
import { Entry } from "@/models/Entry";
import { TagChips } from "@/modules/tags/components/TagChips";

import { EntryControls } from "./EntryControls";
import { EntryControl } from "./EntryControls/types";
import { EntryInfo } from "./EntryInfo";

type EntryCardProps = {
  entry: Entry;
  controls: EntryControl[];
  queryKey: QueryKey;
  datesToDisplay?: DatesToDisplay;
  defaultShowTags?: boolean;
  onTrashSuccess?: () => void;
};

export const EntryCard = ({
  entry,
  controls,
  queryKey,
  datesToDisplay,
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
          datesToDisplay={datesToDisplay}
        />
      </div>

      <Collapsible show={tags.length > 0 && showTags}>
        <div className="border-border border-t p-2">
          <TagChips tags={tags} />
        </div>
      </Collapsible>
    </Card>
  );
};
