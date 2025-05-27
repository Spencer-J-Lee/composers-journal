import { ERROR_MESSAGES } from "@/constants/messages";
import { API_PATHS } from "../constants/apiPaths";

export const apiGetEntries = async () => {
  const res = await fetch(API_PATHS.ENTRIES.ROOT);

  if (!res.ok) {
    throw new Error(ERROR_MESSAGES.USER.FETCH.ENTRIES);
  }

  return res.json();
};
