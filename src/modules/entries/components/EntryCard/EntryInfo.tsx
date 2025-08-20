import { Dispatch, SetStateAction } from "react";

import { DateDisplay } from "@/components/DateDisplay";
import { DatesToDisplay } from "@/components/DateDisplay/types";
import { Divider } from "@/components/dividers/Divider";
import { Typography } from "@/components/Typography";
import { Entry } from "@/models/Entry";

import { Markdown } from "./Markdown";

type EntryInfoProps = {
  entry: Entry;
  showTags: boolean;
  setShowTags: Dispatch<SetStateAction<boolean>>;
  datesToDisplay?: DatesToDisplay;
};

export const EntryInfo = ({
  entry,
  showTags,
  setShowTags,
  datesToDisplay,
}: EntryInfoProps) => {
  const { title, description, tags, createdAt, updatedAt, status } = entry;

  return (
    <div className="border-border flex flex-1 flex-col border-l p-4">
      {/* TODO: make sure tag hierarchy is in order */}
      <Typography variant="h4" className="mb-1">
        {title}
      </Typography>

      <Divider className="my-2" />

      <Markdown markdown={description} className="mb-2" />

      <div className="mt-auto flex justify-between gap-10">
        <Typography
          variant="smallMuted"
          className="flex items-center gap-x-1.5"
        >
          <DateDisplay
            createdAt={createdAt}
            updatedAt={updatedAt}
            status={status}
            datesToDisplay={datesToDisplay}
          />
        </Typography>

        {tags && tags.length > 0 && (
          <button
            onClick={() => setShowTags((prev) => !prev)}
            className="text-text-muted -mx-2 -my-1 px-2 py-1 text-xs font-medium uppercase tracking-widest"
          >
            {showTags ? "Hide tags" : "Show tags"}
          </button>
        )}
      </div>
    </div>
  );
};
