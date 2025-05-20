import clsx from "clsx";

import { Tag } from "@/lib/types/Tag";

import { Chip } from "../shared/Chip";

type TagsProps = {
  tags: Tag[];
  className?: string;
};

export const Tags = ({ tags, className }: TagsProps) => {
  return (
    <ul className={clsx("flex flex-wrap gap-2 p-2", className)}>
      {tags.map((tag) => (
        <li key={tag.id}>
          <Chip text={tag.name} />
        </li>
      ))}
    </ul>
  );
};
