import { STATUSES } from "@/models/types/status";
import { ApiGetEntriesProps } from "@/services/entries/get";

export const RECENTLY_UPDATED_ENTRIES_PARAMS: ApiGetEntriesProps = {
  orderBy: [{ column: "updatedAt", direction: "desc" }],
  limit: 3,
  status: STATUSES.ACTIVE,
};
