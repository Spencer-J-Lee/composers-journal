import { Card } from "@/components/Card";
import { Typography } from "@/components/Typography";

import { RecentEntriesSection } from "./RecentEntriesSection";

/**
 * TODO: add metrics
 */
export const DashboardContent = () => {
  return (
    <div>
      <section className="grid grid-cols-2 gap-4">
        <Card>
          <Typography variant="h3" className="mb-3">
            Notebook Metrics
          </Typography>

          <ul className="space-y-2">
            <li>
              <Typography variant="bodySmall"># of notebooks:</Typography>
              <Typography variant="body">3</Typography>
            </li>
            <li>
              <Typography variant="bodySmall">Largest notebook:</Typography>
              <Typography variant="body">Composition (84 entries)</Typography>
            </li>
          </ul>
        </Card>

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
