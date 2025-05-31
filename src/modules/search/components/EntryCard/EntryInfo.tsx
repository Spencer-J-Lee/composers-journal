import { Dispatch, SetStateAction } from "react";
import clsx from "clsx";

import { Divider } from "@/components/Divider";
import { Entry } from "@/models/Entry";

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
  const { title, description, tags, createdAt } = entry;

  return (
    <div className={clsx("flex flex-1 flex-col p-4", className)}>
      {/* TODO: make sure tag hierarchy is in order */}
      <h2 className="mb-1 text-xl font-semibold">{title}</h2>

      <Divider orientation="horizontal" className="my-2" />

      <Markdown markdown={description} className="mb-2" />

      <div className="mt-auto flex justify-between gap-10">
        <small className="text-text-muted">
          Created: {new Date(createdAt).toLocaleDateString()}
        </small>

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
