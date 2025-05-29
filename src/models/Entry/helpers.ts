import { EntryStatus, entryStatusValues } from "./types";

export const isEntryStatus = (value: unknown): value is EntryStatus => {
  return (
    typeof value === "string" &&
    entryStatusValues.includes(value as EntryStatus)
  );
};
