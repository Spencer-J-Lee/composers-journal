import { Dispatch, SetStateAction } from "react";
import clsx from "clsx";

import { Divider } from "@/components/Divider";
import { Typography } from "@/components/Typography";
import { Entry } from "@/models/Entry";
import { formatDateString } from "@/utils/client/formatDate";

import { Markdown } from "./Markdown";

type EntryInfoProps = {
  entry: Entry;
  showTags: boolean;
  setShowTags: Dispatch<SetStateAction<boolean>>;
  className?: string;
};

export const EntryInfo = ({
  entry,
  showTags,
  setShowTags,
  className,
}: EntryInfoProps) => {
  const { title, description, tags, createdAt, updatedAt } = entry;

  return (
    <div className={clsx("flex flex-1 flex-col p-4", className)}>
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
          <span>Created: {formatDateString(createdAt)}</span>•
          <span>Updated: {formatDateString(updatedAt)}</span>
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
