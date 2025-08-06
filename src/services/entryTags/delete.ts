import { EntryTag } from "@/models/EntryTag";

import { API_PATHS } from "../constants/apiPaths";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";

type apiDeleteEntryTagsProps = {
  entryId?: EntryTag["entryId"];
  ids?: EntryTag["tagId"][];
};

export const apiDeleteEntryTags = async (
  props: apiDeleteEntryTagsProps,
): Promise<void> => {
  await fetchWithErrorHandling<void>(API_PATHS.ENTRIES.TAGS, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });
};
