import { tags } from "@/db/schema";
import { Tag } from "@/models/Tag";

import { API_PATHS } from "../constants/apiPaths";
import { CommonApiOptions } from "../types";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";
import { genUrlWithSearchParams } from "../utils/genUrlWithSearchParams";

export type apiGetTags = {
  searchStr?: string;
  notIds?: number[];
} & CommonApiOptions<typeof tags>;

export const apiGetTags = async (props: apiGetTags): Promise<Tag[]> => {
  return await fetchWithErrorHandling<Tag[]>(
    genUrlWithSearchParams(API_PATHS.TAGS.ROOT, props),
  );
};
