import { faTags } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

import { Divider } from "@/components/Divider";
import { IconButton } from "@/components/iconButtons/IconButton";
import { Tag } from "@/models/Tag";
import { TagChips } from "@/modules/tags/components/TagChips";

type TagsEditorProps = {
  tags: Tag[];
  className?: string;
};

export const TagsEditor = ({ tags, className }: TagsEditorProps) => {
  return (
    <div className={clsx("flex items-center", className)}>
      <IconButton faIcon={faTags} className="shrink-0" />

      <Divider orientation="vertical" flexChild className="ml-2 mr-4" />

      <TagChips
        tags={tags}
        className="flex-overflow-fix hide-scrollbar -m-4 overflow-x-auto text-nowrap p-4"
      />
    </div>
  );
};
