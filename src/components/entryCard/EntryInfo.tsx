import { Dispatch, SetStateAction } from "react";

interface EntryInfoProps {
  title: string;
  description: string;
  tags: string[];
  showTags: boolean;
  setShowTags: Dispatch<SetStateAction<boolean>>;
}

export const EntryInfo = ({
  title,
  description,
  tags,
  showTags,
  setShowTags,
}: EntryInfoProps) => {
  return (
    <div className="border-border flex flex-1 flex-col border-l px-4 pb-2 pt-4">
      {/* TODO make sure tag hierarchy is in order */}
      <h2 className="mb-1 text-xl font-semibold">{title}</h2>
      <p className="mb-2">{description}</p>

      {tags.length > 0 && (
        <div className="mt-auto self-end">
          <button
            onClick={() => setShowTags((prev) => !prev)}
            className="text-accent -m-1 p-1 text-xs font-medium uppercase tracking-widest"
          >
            {showTags ? "Hide tags" : "Show tags"}
          </button>
        </div>
      )}
    </div>
  );
};
