"use client";

import Link from "next/link";

import { Card } from "@/components/Card";
import { ShimmerMetricsCard } from "@/components/shimmerLoaders/ShimmerMetricsCard";
import { Typography } from "@/components/Typography";
import { routes } from "@/constants/routes";
import { useNotebookMetrics } from "@/hooks/cache/notebooks";
import { useLogError } from "@/hooks/useLogError";

export const NotebookMetrics = () => {
  const { data, error, isPending, isError, isSuccess } = useNotebookMetrics();
  useLogError(error);

  if (isPending) {
    return <ShimmerMetricsCard itemCount={2} />;
  }

  return (
    <Card>
      <Typography variant="h3" className="mb-3">
        Notebook Metrics
      </Typography>

      {isError && (
        <Typography variant="fallback">Failed to load entries</Typography>
      )}

      {isSuccess && (
        <ul className="space-y-2">
          <li>
            <Typography variant="smallMuted"># of notebooks:</Typography>
            <Typography variant="body">{data.totalNotebooks}</Typography>
          </li>
          {!!data.largestNotebook && (
            <li>
              <Typography variant="smallMuted">Largest notebook:</Typography>
              <Typography variant="body">
                <Link
                  href={routes.notebook(data.largestNotebook.id)}
                  className="hover:underline"
                >
                  {data.largestNotebook.name}
                </Link>{" "}
                ({data.largestNotebook.entryCount} entries)
              </Typography>
            </li>
          )}
        </ul>
      )}
    </Card>
  );
};
