import clsx from "clsx";

import { Divider } from "@/components/Divider";
import { Typography } from "@/components/Typography";
import { Tag } from "@/models/Tag";
import { TagChips } from "@/modules/tags/components/TagChips";

import { TagsDialog } from "./TagsDialog";

type TagsEditorProps = {
  tags: Tag[];
  className?: string;
};

export const TagsEditor = ({ tags, className }: TagsEditorProps) => {
  return (
    <div className={clsx("flex items-center", className)}>
      <TagsDialog />

      <Divider orientation="vertical" flexChild className="ml-2 mr-4" />

      {tags.length > 0 ? (
        <TagChips
          tags={tags}
          className="flex-overflow-fix hide-scrollbar -m-4 flex-1 overflow-x-auto text-nowrap p-4"
          noWrap
        />
      ) : (
        <Typography variant="emptyState">No tags</Typography>
      )}
    </div>
  );
};
