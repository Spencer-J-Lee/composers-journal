import { EntryStatus, entryStatusValues } from "./types";

export const isEntryStatus = (value: any): value is EntryStatus => {
  return (
    typeof value === "string" &&
    entryStatusValues.includes(value as EntryStatus)
  );
};
