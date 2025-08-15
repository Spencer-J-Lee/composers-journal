"use client";

import { Card } from "@/components/Card";
import { ShimmerMetricsCard } from "@/components/shimmerLoaders/ShimmerMetricsCard";
import { Typography } from "@/components/Typography";
import { useEntryMetrics } from "@/hooks/cache/entries";
import { useLogError } from "@/hooks/useLogError";
import { TagChips } from "@/modules/tags/components/TagChips";

export const EntryMetrics = () => {
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
        <ul className="space-y-2">
          <li>
            <Typography variant="smallMuted">Active entries:</Typography>
            <Typography variant="body">{data.activeEntries}</Typography>
          </li>
          <li>
            <Typography variant="smallMuted">Trashed entries:</Typography>
            <Typography variant="body">{data.trashedEntries}</Typography>
          </li>
          <li>
            <Typography variant="smallMuted">
              New entries (last 30 days):
            </Typography>
            <Typography variant="body">{data.recentEntries}</Typography>
          </li>
          <li>
            <Typography variant="smallMuted">Most used tags:</Typography>
            <Typography variant="body">
              <TagChips
                tags={data.topTags.map(({ name, usageCount }) => ({
                  name: `${name}: ${usageCount}`,
                }))}
                className="mt-1"
              />
            </Typography>
          </li>
        </ul>
      )}
    </Card>
  );
};
