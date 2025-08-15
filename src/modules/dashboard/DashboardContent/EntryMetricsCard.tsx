"use client";

import { Card } from "@/components/Card";
import { ShimmerMetricsCard } from "@/components/shimmerLoaders/ShimmerMetricsCard";
import { Typography } from "@/components/Typography";
import { useEntryMetrics } from "@/hooks/cache/entries";
import { useLogError } from "@/hooks/useLogError";
import { TagChips } from "@/modules/tags/components/TagChips";

import { MetricsGrid } from "./MetricsGrid";

export const EntryMetricsCard = () => {
  const { data, error, isPending, isError, isSuccess } = useEntryMetrics();
  useLogError(error);

  if (isPending) {
    return <ShimmerMetricsCard itemCount={4} />;
  }

  return (
    <Card>
      <Typography variant="h3" className="mb-3">
        Entry Metrics
      </Typography>

      {isError && (
        <Typography variant="fallback">Failed to load entry metrics</Typography>
      )}

      {isSuccess && (
        <MetricsGrid
          data={[
            {
              title: "Active entries",
              content: data.activeEntries,
            },
            {
              title: "Trashed entries",
              content: data.trashedEntries,
            },
            {
              title: "New entries (last 30 days)",
              content: data.recentEntries,
            },
            {
              title: "Most used tags",
              content: (
                <TagChips
                  tags={data.topTags.map(({ name, usageCount }) => ({
                    name: `${name}: ${usageCount}`,
                  }))}
                  className="mt-1"
                />
              ),
            },
          ]}
        />
      )}
    </Card>
  );
};
