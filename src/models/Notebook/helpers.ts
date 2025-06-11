import { apiGetNotebooks } from "@/services/notebooks";

import { STATUSES } from "../types/status";

export const checkNotebookNameUnique = async (val: string) => {
  const trimmedVal = val.trim();

  if (!trimmedVal) {
    return true;
  }

  const notebooks = await apiGetNotebooks({
    name: trimmedVal,
    status: STATUSES.ACTIVE,
    limit: 1,
  });

  return notebooks.length === 0;
};
