import { Entry } from "@/lib/types/Entry";
import { Dispatch, SetStateAction } from "react";

interface EntryInfoProps {
  entry: Entry;
  showTags: boolean;
  setShowTags: Dispatch<SetStateAction<boolean>>;
}

export const EntryInfo = ({ entry, showTags, setShowTags }: EntryInfoProps) => {
  const { title, description, tags, createdAt } = entry;

  return (
    <div className="border-border flex flex-1 flex-col border-l px-4 pb-2 pt-4">
      {/* TODO make sure tag hierarchy is in order */}
      <h2 className="mb-1 text-xl font-semibold">{title}</h2>
      <p className="mb-2">{description}</p>

      <div className="mt-auto flex justify-between gap-10">
        <small>{new Date(createdAt).toLocaleDateString()}</small>

        {tags && tags.length > 0 && (
          <button
            onClick={() => setShowTags((prev) => !prev)}
            className="text-accent -m-1 p-1 text-xs font-medium uppercase tracking-widest"
          >
            {showTags ? "Hide tags" : "Show tags"}
          </button>
        )}
      </div>
    </div>
  );
};
