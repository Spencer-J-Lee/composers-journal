export type NotebookMetrics = {
  totalNotebooks: number;
  largestNotebook: {
    id: number;
    name: string;
    entryCount: number;
  } | null;
};
