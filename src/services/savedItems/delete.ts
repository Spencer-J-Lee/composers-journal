import { SavedItem } from "@/models/SavedItem";

import { API_PATHS } from "../constants/apiPaths";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";

type apiDeleteSavedItemsProps = {
  entryId: SavedItem["entryId"];
};

export const apiDeleteSavedItem = async (props: apiDeleteSavedItemsProps) => {
  return await fetchWithErrorHandling<SavedItem>(API_PATHS.SAVED_ITEMS.ROOT, {
    method: "DELETE",
    body: JSON.stringify(props),
  });
};

export const apiDeleteSavedEntry = async (entryId: SavedItem["entryId"]) => {
  return await apiDeleteSavedItem({ entryId });
};
