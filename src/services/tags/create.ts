import { Tag } from "@/models/Tag";

import { API_PATHS } from "../constants/apiPaths";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";

type CreateTagParam = {
  name: string;
};

export const apiCreateTags = (params: CreateTagParam[]): Promise<Tag[]> => {
  return fetchWithErrorHandling<Tag[]>(API_PATHS.TAGS.ROOT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
};
