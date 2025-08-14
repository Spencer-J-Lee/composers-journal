import { EntryMetrics } from "./EntryMetrics";
import { NotebookMetrics } from "./NotebookMetrics";
import { RecentEntriesSection } from "./RecentEntriesSection";

export const DashboardContent = () => {
  return (
    <div className="space-y-8">
      <section className="grid grid-cols-2 gap-4">
        <NotebookMetrics />
        <EntryMetrics />
      </section>

      <RecentEntriesSection />
    </div>
  );
};
