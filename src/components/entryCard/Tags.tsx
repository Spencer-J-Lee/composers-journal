import { Chip } from "../common/Chip";

interface TagsProps {
  tags: string[];
}

export const Tags = ({ tags }: TagsProps) => {
  return (
    <ul className="border-border flex flex-wrap gap-2 border-t p-2">
      {tags.map((tag) => (
        <li key={tag}>
          <Chip text={tag} />
        </li>
      ))}
    </ul>
  );
};
