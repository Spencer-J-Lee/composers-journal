import { entries, entriesRelations } from "./entries";
import { entryTags, entryTagsRelations } from "./entryTags";
import { notebooks, notebooksRelations } from "./notebooks";
import { tags, tagsRelations } from "./tags";

export {
  entries,
  entriesRelations,
  entryTags,
  entryTagsRelations,
  notebooks,
  notebooksRelations,
  tags,
  tagsRelations,
};
const schemas = {
  entries,
  entryTags,
  entryTagsRelations,
  notebooks,
  tags,
  entriesRelations,
  tagsRelations,
  notebooksRelations,
};

export default schemas;
