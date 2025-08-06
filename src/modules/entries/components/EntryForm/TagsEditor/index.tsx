import clsx from "clsx";

import { Divider } from "@/components/Divider";
import { Typography } from "@/components/Typography";
import { TagChips } from "@/modules/tags/components/TagChips";

import { TagsDialog } from "./TagsDialog";
import { TagOption } from "./TagsDialog/types";

type TagsEditorProps = {
  tagOptions: TagOption[];
  className?: string;
  onConfirm: (newVal: TagOption[]) => void;
};

export const TagsEditor = ({
  tagOptions,
  className,
  onConfirm,
}: TagsEditorProps) => {
  return (
    <div className={clsx("flex items-center", className)}>
      <TagsDialog initialTagOptions={tagOptions} onConfirm={onConfirm} />

      <Divider orientation="vertical" flexChild className="ml-2 mr-3" />

      {tagOptions.length > 0 ? (
        <TagChips
          tags={tagOptions.map((op) => ({ name: op.label }))}
          className="flex-overflow-fix hide-scrollbar flex-1 overflow-x-auto text-nowrap"
          noWrap
        />
      ) : (
        <Typography variant="emptyState">No tags</Typography>
      )}
    </div>
  );
};
