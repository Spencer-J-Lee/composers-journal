import { SavedItem } from "@/models/SavedItem";

import { API_PATHS } from "../constants/apiPaths";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";

type apiCreateSavedItemProps = Pick<SavedItem, "entryId">;

export const apiCreateSavedItem = async (
  props: apiCreateSavedItemProps,
): Promise<SavedItem> => {
  return await fetchWithErrorHandling<SavedItem>(API_PATHS.SAVED_ITEMS.ROOT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });
};

export const apiCreateSavedEntry = async (
  entryId: SavedItem["entryId"],
): Promise<SavedItem> => {
  return await apiCreateSavedItem({ entryId });
};
