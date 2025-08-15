import clsx from "clsx";

import { Chip } from "@/components/Chip";
import { Tag } from "@/models/Tag";

type TagsProps = {
  tags: Tag[] | { name: Tag["name"] }[];
  className?: string;
  noWrap?: boolean;
};

export const TagChips = ({ tags, className, noWrap }: TagsProps) => {
  return (
    <ul className={clsx("flex gap-2", { "flex-wrap": !noWrap }, className)}>
      {tags.map((tag, i) => (
        <li key={i}>
          <Chip text={tag.name} />
        </li>
      ))}
    </ul>
  );
};
