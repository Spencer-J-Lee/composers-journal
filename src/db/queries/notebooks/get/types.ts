export type NotebookMetrics = {
  activeNotebooks: number;
  trashedNotebooks: number;
  largestNotebook: {
    id: number;
    name: string;
    entryCount: number;
  } | null;
};
