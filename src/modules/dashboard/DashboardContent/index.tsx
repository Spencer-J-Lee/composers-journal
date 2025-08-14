import { Card } from "@/components/Card";
import { Typography } from "@/components/Typography";

import { NotebookMetrics } from "./NotebookMetrics";
import { RecentEntriesSection } from "./RecentEntriesSection";

/**
 * TODO: add metrics
 */
export const DashboardContent = () => {
  return (
    <div className="space-y-8">
      <section className="grid grid-cols-2 gap-4">
        <NotebookMetrics />

        <Card>
          <Typography variant="h3" className="mb-3">
            Entry Metrics
          </Typography>

          <ul className="space-y-2">
            <li>
              <Typography variant="bodySmall"># of entries:</Typography>
              <Typography variant="body">103</Typography>
            </li>
          </ul>
        </Card>
      </section>

      <RecentEntriesSection />
    </div>
  );
};
