import { Tag } from "@/models/Tag";
import { Chip } from "../common/Chip";

interface TagsProps {
  tags: Tag[];
}

export const Tags = ({ tags }: TagsProps) => {
  return (
    <ul className="border-border flex flex-wrap gap-2 border-t p-2">
      {tags.map((tag) => (
        <li key={tag.id}>
          <Chip text={tag.name} />
        </li>
      ))}
    </ul>
  );
};
