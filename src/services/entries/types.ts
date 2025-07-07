import { Entry } from "@/models/Entry";

export type EntryPage = {
  entries: Entry[];
  nextPage: number | null;
};
