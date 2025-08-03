import { Tag } from "@/models/Tag";

import { TagOption } from "./types";

export const tagsToOptions = (tags: Tag[]): TagOption[] => {
  return tags.map(({ id, name }) => ({
    value: id,
    label: name,
  }));
};
