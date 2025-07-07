import { EntryPage } from "@/services/entries/types";

export type InfiniteEntriesCache = {
  pageParams: number[];
  pages: EntryPage[];
};
