import { tags } from "@/db/schema";
import { Tag } from "@/models/Tag";

import { API_PATHS } from "../constants/apiPaths";
import { CommonApiOptions } from "../types";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";
import { genUrlWithSearchParams } from "../utils/genUrlWithSearchParams";

export type apiGetTagsProps = CommonApiOptions<typeof tags>;

export const apiGetTags = async (
  props: apiGetTagsProps = {},
): Promise<Tag[]> => {
  return await fetchWithErrorHandling<Tag[]>(
    genUrlWithSearchParams(API_PATHS.TAGS.ROOT, props),
  );
};
