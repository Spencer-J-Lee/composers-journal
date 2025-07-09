import { STATUSES } from "@/models/types/status";
import { apiGetEntriesProps } from "@/services/entries/get";

export const RECENTLY_UPDATED_ENTRIES_PARAMS: apiGetEntriesProps = {
  orderBy: [{ column: "updatedAt", direction: "desc" }],
  limit: 3,
  status: STATUSES.TRASHED,
};
