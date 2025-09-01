import { SavedItem } from "@/models/SavedItem";

import { API_PATHS } from "../constants/apiPaths";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";

type ApiDeleteSavedItemsProps = {
  entryId: SavedItem["entryId"];
};

export const apiDeleteSavedItem = (props: ApiDeleteSavedItemsProps) => {
  return fetchWithErrorHandling<SavedItem>(API_PATHS.SAVED_ITEMS.ROOT, {
    method: "DELETE",
    body: JSON.stringify(props),
  });
};

export const apiDeleteSavedEntry = (entryId: SavedItem["entryId"]) => {
  return apiDeleteSavedItem({ entryId });
};
