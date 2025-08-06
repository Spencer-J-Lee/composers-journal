import { EntryTag } from "@/models/EntryTag";

import { API_PATHS } from "../constants/apiPaths";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";

type CreateEntryTagParam = {
  entryId: number;
  tagId: number;
};

export const apiCreateEntryTags = async (
  params: CreateEntryTagParam[],
): Promise<EntryTag[]> => {
  return await fetchWithErrorHandling<EntryTag[]>(API_PATHS.ENTRIES.TAGS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
};
