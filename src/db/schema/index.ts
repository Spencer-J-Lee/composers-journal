import { statusEnum } from "@/models/types/status";

import { entries, entriesRelations } from "./entries";
import { entryTags, entryTagsRelations } from "./entryTags";
import { notebooks, notebooksRelations } from "./notebooks";
import { savedItems, savedItemsRelations } from "./savedItems";
import { tags, tagsRelations } from "./tags";

// Re-exported so drizzle-kit sees the enum as owned by this schema and
// doesn't try to drop the "status" type from the database.
export { statusEnum };

export {
  entries,
  entriesRelations,
  entryTags,
  entryTagsRelations,
  notebooks,
  notebooksRelations,
  savedItems,
  savedItemsRelations,
  tags,
  tagsRelations,
};

const schemas = {
  entries,
  entriesRelations,
  entryTags,
  entryTagsRelations,
  notebooks,
  notebooksRelations,
  savedItems,
  savedItemsRelations,
  tags,
  tagsRelations,
};

export default schemas;
