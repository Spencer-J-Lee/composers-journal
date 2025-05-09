import { Entry } from "@/models/Entry";
import { Dispatch, SetStateAction } from "react";

interface EntryInfoProps {
  entry: Entry;
  showTags: boolean;
  setShowTags: Dispatch<SetStateAction<boolean>>;
}

export const EntryInfo = ({ entry, showTags, setShowTags }: EntryInfoProps) => {
  const { title, description, tags, created_at } = entry;
  console.log(`created_at:`, created_at);
  return (
    <div className="flex flex-1 flex-col px-4 pb-2 pt-4">
      {/* TODO make sure tag hierarchy is in order */}
      <h2 className="mb-1 text-xl font-semibold">{title}</h2>
      <p className="mb-2">{description}</p>

      <div className="mt-auto flex justify-between gap-10">
        <small>{new Date(created_at).toLocaleDateString()}</small>

        {tags.length > 0 && (
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
