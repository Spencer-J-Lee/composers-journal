import { EntryTag } from "@/models/EntryTag";

import { API_PATHS } from "../constants/apiPaths";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";

type ApiDeleteEntryTagsProps = {
  entryId?: EntryTag["entryId"];
  ids?: EntryTag["tagId"][];
};

export const apiDeleteEntryTags = async (
  props: ApiDeleteEntryTagsProps,
): Promise<void> => {
  await fetchWithErrorHandling<void>(API_PATHS.ENTRIES.TAGS, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });
};
