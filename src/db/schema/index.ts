import { entries, entriesRelations } from "./entries";
import { entryTags, entryTagsRelations } from "./entryTags";
import { notebooks, notebooksRelations } from "./notebooks";
import { savedItems, savedItemsRelations } from "./savedItems";
import { tags, tagsRelations } from "./tags";

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
