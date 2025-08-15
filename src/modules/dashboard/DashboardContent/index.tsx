import { EntryMetricsCard } from "./EntryMetricsCard";
import { NotebookMetricsCard } from "./NotebookMetricsCard";
import { RecentEntriesSection } from "./RecentEntriesSection";

export const DashboardContent = () => {
  return (
    <div className="space-y-8">
      <section className="grid grid-cols-2 gap-4">
        <NotebookMetricsCard />
        <EntryMetricsCard />
      </section>

      <RecentEntriesSection />
    </div>
  );
};
