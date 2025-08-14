export type EntryMetrics = {
  activeEntries: number;
  trashedEntries: number;
  recentEntries: number;
  topTags: {
    id: number;
    name: string;
    usageCount: number;
  }[];
};
